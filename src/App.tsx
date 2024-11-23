"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchMessages } from "./api/fetchMessages";
import { sendMessage as sendMessageAPI } from "./api/sendMessages";

interface Message {
  text: string;
  userId: string;
  timestamp: number;
  room: string;
}

const rooms = ["General", "Technology", "Random", "Support"];

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [userId] = useState(`user-${Math.random().toString(36).substr(2, 9)}`);
  const [currentRoom, setCurrentRoom] = useState("General");
  const socketRef = useRef<Socket>();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Memoized fetchMessages function
  const fetchMessagesForRoom = useCallback(async (room: string) => {
    console.log(`Fetching messages for room: ${room}`);
    const fetchedMessages = await fetchMessages(room);
    setMessages(fetchedMessages || []);
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001");

    socketRef.current.on("connect", () => {
      setConnected(true);
      socketRef.current?.emit("join room", currentRoom);
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
    });

    socketRef.current.on("chat message", (message: Message) => {
      if (message.room === currentRoom) {
        setMessages((prev) => [...prev, message]);
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
      }
    });

    fetchMessagesForRoom(currentRoom); // Fetch messages for the initial room

    return () => {
      socketRef.current?.disconnect();
    };
  }, [currentRoom, fetchMessagesForRoom]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && socketRef.current) {
      const message = {
        text: messageInput,
        userId,
        room: currentRoom,
        created_at: new Date().toISOString(), // Add created_at field
      };
      socketRef.current.emit("chat message", message); // Send message via WebSocket
      setMessageInput("");

      // Save message to the database
      await sendMessageAPI(message);
    }
  };

  const handleChangeRoom = (room: string) => {
    if (socketRef.current) {
      socketRef.current.emit("leave room", currentRoom);
      socketRef.current.emit("join room", room);
      setCurrentRoom(room);
      setMessages([]); // Clear messages when changing room
      fetchMessagesForRoom(room); // Fetch messages for the new room
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
          <Select value={currentRoom} onValueChange={handleChangeRoom}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a room" />
            </SelectTrigger>
            <SelectContent>
              {rooms.map((room) => (
                <SelectItem key={room} value={room}>
                  {room}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ScrollArea
            className="h-[500px] mb-4 p-4 rounded-lg border"
            ref={scrollAreaRef}
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                 <div
                 key={index}
                 className={`flex ${
                   message.userId === userId ? "justify-end" : "justify-start"
                 }`}
               >
                 <div
                   className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${
                     message.userId === userId
                       ? "bg-primary text-primary-foreground"
                       : "bg-muted"
                   }`}
                 >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-70">
                      {message.created_at &&
                      !isNaN(new Date(message.created_at).getTime())
                        ? new Date(message.created_at).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true, // Adjust for 12-hour format
                            }
                          )
                        : "Invalid Date"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="flex gap-2">
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
