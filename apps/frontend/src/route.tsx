import type { RouteObject } from "react-router";
import App from "./App";
import ChatSessionRoute from "./routes/ChatSessionRoute";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat/:sessionId",
    element: <ChatSessionRoute />,
  },
];
