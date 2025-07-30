const supabase = require('./supabase');

exports.handler = async (event, context) => {
  // 允许跨域请求
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // 禁用删除功能，返回提示信息
  return {
    statusCode: 403,
    headers,
    body: JSON.stringify({ 
      error: '每人只能提交一次留言' 
    })
  };
};