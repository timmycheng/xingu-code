import type { SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | undefined

export function useSupabaseCustomClient() {
  if (!client) {
    throw new Error('Supabase client not initialized')
  }
  return client
}

export function setSupabaseCustomClient(newClient: SupabaseClient) {
  client = newClient
}
