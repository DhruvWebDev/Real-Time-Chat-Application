import supabase from "@/utils/supabase"

interface Message {
  id: string
  text: string
  user_id: string
  room: string
  created_at: string
  file_url?: string  // Make sure this is included
}

export const sendMessage = async (message: Omit<Message, 'id'>)  => {
  const { data, error } = await supabase.from('messages').insert(message);

  if (error) {
    console.error('Error sending message:', error);
    throw error;
  }
  
  return data || [];
};