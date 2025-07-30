const supabase = require('./supabase');

exports.handler = async (event, context) => {
  // 允许跨域请求
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('接收到删除请求:', { body: event.body });
    
    // 在try块开始处添加ID验证和转换
    const { id, ip } = JSON.parse(event.body);
    
    // 验证ID格式
    if (!id || !ip) {
      console.log('参数验证失败:', { id, ip });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'ID和IP是必需的参数', received: { id, ip } })
      };
    }

    // 尝试将ID转换为数字（如果数据库使用整数ID）
    const messageId = isNaN(Number(id)) ? id : Number(id);
    console.log('转换后的ID:', messageId);
    
    // 首先检查这条留言是否存在且IP匹配
    const { data: message, error: fetchError } = await supabase
      .from('guestbook')
      .select('ip')
      .eq('id', messageId)
      .single();

    if (fetchError || !message) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: '留言不存在' })
      };
    }

    // 检查IP是否匹配（只允许删除自己的留言）
    if (message.ip !== ip) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: '无权限删除此留言' })
      };
    }

    // 从Supabase删除留言
    const { error: deleteError } = await supabase
      .from('guestbook')
      .delete()
      .eq('id', messageId);

    if (deleteError) {
      console.error('Supabase删除错误:', deleteError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: '数据库删除失败' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: '留言删除成功'
      })
    };
  } catch (error) {
    console.error('Error deleting guestbook entry:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: '服务器内部错误' })
    };
  }
};