import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { fetchMessages } from "@/api/fetchMessages";
import { sendMessage as sendMessageToAPI } from "@/api/sendMessages";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";

// Message Interface
interface Message {
  id: string;
  text: string;
  user_id: string;
  room: string;
  created_at: string;
  file_url?: string;  // Optional for file URLs
}

export default function App() {
  const { user } = useUser(); // Clerk user object
  const [messages, setMessages] = useState<Message[]>([]); // Messages state
  const [messageInput, setMessageInput] = useState(""); // Input state
  const [connected, setConnected] = useState(false); // Connection status
  const [roomId, setRoomId] = useState("General"); // Room ID
  const socketRef = useRef<Socket>(); // Socket reference
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Scroll area reference

  const { data: fetchData, fn: fnFetch } = useFetch(fetchMessages); // Fetch hook
  const { data: send, fn: fnSend } = useFetch(sendMessageToAPI); // Fetch hook


  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io("http://localhost:3001");

    socketRef.current.on("connect", () => {
      setConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
    });

    socketRef.current.on("chat message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      }
    });

    // Fetch initial messages for the selected room
    const fetchMessagesForRoom = async () => {
      const fetchedMessages = await fnFetch(roomId);
      if (Array.isArray(fetchedMessages)) {
        setMessages(fetchedMessages); // Set only if it's an array
      } else {
        setMessages([]); // Fallback to an empty array if not an array
      }
    };

    fetchMessagesForRoom();

    // Cleanup socket connection on component unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && socketRef.current) {
      const message = {
        text: messageInput,
        user_id: user?.id, // Use Clerk's user ID or fallback
        room: roomId,
        created_at: new Date().toISOString(),
      };

      // Emit the message to the socket server
      socketRef.current.emit("chat message", message);

      try {
        await fnSend(message); // Await the API call
      } catch (error) {
        console.error('Error sending message:', error);
      }

      // Clear the input field
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Real-time Chat
            <Badge variant={connected ? "default" : "destructive"}>
              {connected ? "Connected" : "Disconnected"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)} className="mb-4">
            <option value="General">General</option>
            <option value="Random">Random</option>
            <option value="Technology">Technology</option>
          </select>
          <ScrollArea className="h-[500px] mb-4 p-4 rounded-lg border" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.user_id === user?.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${
                      message.user_id === user?.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-70">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" disabled={!connected}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
