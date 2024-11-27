import supabaseClient from '@/utils/supabase';

export interface Message {
  id: number; // Ensure this matches your database schema
  text: string;
  user_id: string;
  room: string;
  created_at: string;
  file_url?: string;
}

// Function to fetch messages
export const fetchMessages = async (token: string,_,room: string): Promise<Message[]> => {
  const supabase = supabaseClient(token); // Initialize Supabase client with the token
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('room',room)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return []; // Return an empty array in case of error
  }

  return data || []; // Return the fetched data or an empty array if no data
};