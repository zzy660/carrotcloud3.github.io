const { createClient } = require('@supabase/supabase-js');

// Supabase配置（本地硬编码）
const supabaseUrl = 'https://gwjpldhjelwyslnlydvk.supabase.co';
const supabaseKey = 'sb_secret_abEG8sDAB1s8qBIc18070w_Yf9K2hwu';

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;