Here is the documentation formatted for a Markdown (`.md`) file:

---

# Real-Time Chat Application

This project is a real-time chat application built using **React.js** on the client side and **Node.js** with **Socket.IO** on the server side.

---

## Features

### Client-Side Features
- **Real-Time Messaging**: Messages are sent and received instantly across all connected clients in the same chat room.
- **Room Management**: Users can switch between predefined chat rooms (e.g., *General*, *Technology*).
- **Dynamic Scroll**: Automatically scrolls to the latest message in the chat.
- **Connection Status**: Displays whether the client is connected to the server.
- **Responsive UI**: Clean and responsive interface built with **Shadcn/UI components**.

### Server-Side Features
- **WebSocket Communication**: Handles bidirectional real-time communication using **Socket.IO**.
- **Room-Based Messaging**: Broadcasts messages only to users in the same chat room.
- **Scalable Architecture**: Supports multiple clients and rooms.

---

## Tech Stack

### Client
- **React.js**: Frontend framework.
- **Vite**: Development server and build tool.
- **Socket.IO Client**: For WebSocket communication.
- **Shadcn/UI**: Pre-built UI components.

### Server
- **Node.js**: Backend runtime.
- **Express.js**: HTTP server.
- **Socket.IO Server**: WebSocket server for real-time communication.

---

## Installation and Setup

### Prerequisites
- Node.js installed on your system.
- A package manager like `npm` or `yarn`.

### Steps

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies for both client and server:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Start the server:
   ```bash
   cd server
   node server.js
   ```

4. Start the client:
   ```bash
   cd ../client
   npm run dev
   ```

5. Open the client in your browser at `http://localhost:5173`.

---

## File Structure

### Client
```
client/
├── src/
│   ├── components/
│   │   ├── ui/   # UI components (Button, Card, Input, etc.)
│   ├── ChatApp.tsx  # Main chat application component
│   ├── App.tsx      # Root component
```

### Server
```
server/
├── server.js  # Main server script
```

---

## Code Explanation

### Client-Side (`ChatApp.tsx`)

#### Overview
This component provides the UI and functionality for the chat application. 

#### Key Functionalities
1. **WebSocket Connection**:
   - Connects to the server using `Socket.IO`.
   - Listens for events like `chat message` and manages disconnection.

2. **Message Handling**:
   - Sends messages with the `chat message` event.
   - Appends incoming messages to the UI if they belong to the current room.

3. **Room Management**:
   - Emits `join room` and `leave room` events when switching rooms.
   - Resets the message history upon room change.

#### UI Components
- **Card**: Displays the chat interface.
- **ScrollArea**: Displays the message history.
- **Select**: Dropdown for switching rooms.
- **Input**: For typing messages.
- **Button**: For sending messages.

#### Example Code
```tsx
const sendMessage = (e: React.FormEvent) => {
  e.preventDefault();
  if (messageInput.trim() && socketRef.current) {
    const message = {
      text: messageInput,
      userId,
      timestamp: Date.now(),
      room: currentRoom,
    };
    socketRef.current.emit('chat message', message);
    setMessageInput('');
  }
};
```

---

### Server-Side (`server.js`)

#### Overview
This script implements the backend server using **Express.js** and **Socket.IO**.

#### Key Functionalities
1. **Connection Management**:
   - Logs when a user connects or disconnects.
   - Handles joining and leaving rooms using `socket.join(room)` and `socket.leave(room)`.

2. **Message Broadcasting**:
   - Listens for `chat message` events and broadcasts the message to all users in the specified room using:
     ```js
     io.to(message.room).emit('chat message', message);
     ```

#### Example Code
```js
socket.on('chat message', (message) => {
  io.to(message.room).emit('chat message', message);
});
```

---

## Usage

1. Open the app in your browser (`http://localhost:5173`).
2. Select a chat room using the dropdown menu.
3. Type a message in the input field and click "Send."
4. Watch messages appear in real-time across connected clients.

---

## Customization

- **Rooms**: Modify the `rooms` array in `ChatApp.tsx` to add or remove chat rooms.
- **UI Design**: Customize the UI components in the `components/ui/` directory.

---

## Troubleshooting

- **Connection Issues**:
  - Ensure the server is running on `http://localhost:3001`.
  - Check if CORS is properly configured in the server.

- **Socket.IO Errors**:
  - Verify the client and server are using compatible Socket.IO versions.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

--- 
