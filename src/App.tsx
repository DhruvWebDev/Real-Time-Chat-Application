import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
  text: string
  userId: string
  timestamp: number
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [connected, setConnected] = useState(false)
  const [userId] = useState(`user-${Math.random().toString(36).substr(2, 9)}`)
  const socketRef = useRef<Socket>()
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    socketRef.current = io('http://localhost:3001')

    socketRef.current.on('connect', () => {
      setConnected(true)
    })

    socketRef.current.on('disconnect', () => {
      setConnected(false)
    })

    socketRef.current.on('chat message', (message: Message) => {
      setMessages(prev => [...prev, message])
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
      }
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageInput.trim() && socketRef.current) {
      const message = {
        text: messageInput,
        userId,
        timestamp: Date.now()
      }
      socketRef.current.emit('chat message', message)
      setMessageInput('')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Real-time Chat
            <Badge variant={connected ? "default" : "destructive"}>
              {connected ? 'Connected' : 'Disconnected'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] mb-4 p-4 rounded-lg border" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.userId === userId ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${
                      message.userId === userId
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
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
  )
}

/*
Why useRef is Ideal for Socket Management
Persistence: The socketRef instance remains the same across renders, ensuring the connection isn't recreated unnecessarily.
Performance: Avoids triggering re-renders when the socket state changes (e.g., receiving a new message).
Ease of Cleanup: The socket can be easily disconnected in the cleanup function of useEffect.
Direct Access: Provides direct access to the socket instance for emitting or handling events without relying on state.
This design ensures a stable, efficient, and easy-to-manage WebSocket connection within the React component.
*/
