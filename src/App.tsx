import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./Pages/Not-Found";
import LandingPage from "@/Pages/landing-page"
import ChatApp from "./Pages/chat-app";
import AppLayout from "./Layout/AppLayout";
import ProtectRoute from "./components/protect-routes";
const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />
        },
        {
          path: "/chat-app",
          element: (
            <ProtectRoute>
              <ChatApp />
            </ProtectRoute>
          )
        },
        {
          path: "*",  // Catch-all route for 404
          element: <NotFound />  // Render the NotFound component for unknown routes
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
