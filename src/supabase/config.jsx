import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zxcqxpzqzhabnpjeadpx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Y3F4cHpxemhhYm5wamVhZHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMDk4MjUsImV4cCI6MjAzNTU4NTgyNX0.vXdq5Bpyz41dtq8glNBtq1ppBOzdQsSD-hXMIGboRLc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
