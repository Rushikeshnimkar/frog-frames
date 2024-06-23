import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dwsoenkmqljkugsqlvki.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3c29lbmttcWxqa3Vnc3FsdmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5OTQxMDYsImV4cCI6MjAzNDU3MDEwNn0.0x53fZ5D6fGY5c2tyQjjSOYBsSiXbqaY0GbWZM6WWmM'

export const Supabase = createClient(supabaseUrl, supabaseKey)
