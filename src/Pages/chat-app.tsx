'use client'

import { useState, useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchMessages } from "@/api/fetchMessages"
import { sendMessage as sendMessageToAPI } from "@/api/sendMessages"
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/clerk-react"

interface Message {
  text: string
  user_id: string
  room: string
  created_at: string
  file_url?: string
}

export default function ChatApp() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [connected, setConnected] = useState(false)
  const [roomId, setRoomId] = useState("General")
  const socketRef = useRef<Socket>()
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const { data: fetchedMessages, loading, error, fn: fetchMessagesForRoom } = useFetch(fetchMessages)
  const { fn: fnSend } = useFetch(sendMessageToAPI)

  useEffect(() => {
    socketRef.current = io("http://localhost:3001", {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5
    })

    socketRef.current.on("connect", () => {
      console.log("Connected to socket server")
      setConnected(true)
      socketRef.current?.emit("join-room", roomId)
    })

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from socket server")
      setConnected(false)
    })

    socketRef.current.on("chat-message", (message: Message) => {
      console.log("Received message:", message)
      setMessages(prevMessages => [...prevMessages, message])
      scrollToBottom()
    })
    fetchMessagesForRoom(roomId)

    return () => {
      console.log("Cleaning up socket connection")
      socketRef.current?.emit("leave-room", roomId)
      socketRef.current?.disconnect()
    }
  }, [roomId])

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages)
      scrollToBottom()
    }
    fetchedMessages("");
  }, [fetchedMessages.length > 0])

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (messageInput.trim() && socketRef.current && user?.id) {
      const message: Message = {
        text: messageInput,
        user_id: user.id,
        room: roomId,
        created_at: new Date().toISOString(),
      }

      socketRef.current.emit("chat-message", message)

      try {
        await fnSend(message)
        console.log("Message sent to API successfully")
      } catch (error) {
        console.error("Error sending message to API:", error)
      }

      setMessageInput("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            Real-time Chat
            <Badge variant={connected ? "default" : "destructive"}>
              {connected ? "Connected" : "Disconnected"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={roomId} onValueChange={setRoomId}>
            <SelectTrigger className="mb-4 bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select a room" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Random">Random</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
            </SelectContent>
          </Select>
          <ScrollArea 
            className="h-[500px] mb-4 p-4 rounded-lg border border-gray-700" 
            ref={scrollAreaRef}
          >
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-400">Loading messages...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-400">Error loading messages. Please try again.</p>
              </div>
            ) : messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.user_id === user?.id ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${message.user_id === user?.id ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white" : "bg-gray-700 text-gray-100"}`}
                    >
                      <p>{message.text}</p>
                      <span className="text-xs opacity-70">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-400">No messages in this room yet.</p>
              </div>
            )}
          </ScrollArea>
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 border-gray-600 text-white"
            />
            <Button 
              type="submit" 
              disabled={!connected}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
