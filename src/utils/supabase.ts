import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nYWdmeHlqa3V0dm1nZG9ic29lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0ODMzMjM4NSwiZXhwIjoxOTYzOTA4Mzg1fQ.ChRG1F3CGSHILkvCf7ArnL907hhJ3COJ5dWMVWdK9qg'

const SUPABASE_URL = "https://mgagfxyjkutvmgdobsoe.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase