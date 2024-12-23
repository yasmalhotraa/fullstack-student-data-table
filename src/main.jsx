import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import "./index.css";
import Dashboard from "./SidebarOptions/Dashboard";
import Chapter from "./SidebarOptions/Chapter";
import Settings from "./SidebarOptions/Settings";
import Help from "./SidebarOptions/Help";
import Reports from "./SidebarOptions/Reports";
import Students from "./SidebarOptions/Students";
import Header from "./components/custom/Header";
import Sidebar from "./components/custom/Sidebar";

// Main layout component
const Layout = () => (
  <div className="flex bg-[#f6f8fa]">
    <Sidebar />
    <div className="flex-1 flex flex-col bg-[#f6f8fa]">
      <Header />
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap routes with Layout
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "chapter", element: <Chapter /> },
      { path: "settings", element: <Settings /> },
      { path: "help", element: <Help /> },
      { path: "reports", element: <Reports /> },
      { path: "students", element: <Students /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
