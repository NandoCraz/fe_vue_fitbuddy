import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pwhzcafmkrkwukxdcvvs.supabase.co"; // Dari dashboard Supabase
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3aHpjYWZta3Jrd3VreGRjdnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1ODMwMTAsImV4cCI6MjA4MDE1OTAxMH0.NaIOGEOXYgu5iXSfk4YRwUimTjP1zY1oGFGGLqEGb4o"; // Dari dashboard Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
