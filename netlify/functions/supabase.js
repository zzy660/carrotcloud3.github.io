const { createClient } = require('@supabase/supabase-js');

// Supabase配置（本地硬编码）
const supabaseUrl = 'https://gwjpldhjelwyslnlydvk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3anBsZGhqZWx3eXNsbmx5ZHZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzcwNDMzNiwiZXhwIjoyMDY5MjgwMzM2fQ.HVd9RyQ59ePZWFi8dP0Jk1W7ZCNKm_xGwxPs_0F6Npo';

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;