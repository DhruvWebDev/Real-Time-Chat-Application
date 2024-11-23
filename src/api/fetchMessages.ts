import  supabase from '@/utils/supabase';


export interface Message {
  id: string;
  text: string;
  user_id: string;
  room: string;
  created_at: string;
  file_url?: string;
}

// Function to fetch messages
export const fetchMessages = async (room: string): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('room', room)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data || [];
};
