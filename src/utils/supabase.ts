import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nYWdmeHlqa3V0dm1nZG9ic29lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NzE3NDA1MywiZXhwIjoxOTYyNzUwMDUzfQ.WngDWSsQVwtRP3KfUcNDen6T4_Z3XPVuD_gDng-LGuw'

const SUPABASE_URL = "https://mgagfxyjkutvmgdobsoe.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase