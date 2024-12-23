import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.svg";

const Sidebar = () => {
  // Initialize activeLink based on the current route
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <HomeIcon className="w-6 h-6" />,
      href: "/dashboard",
    },
    {
      name: "Students",
      icon: <UserGroupIcon className="w-6 h-6" />,
      href: "/students",
    },
    {
      name: "Chapter",
      icon: <BookOpenIcon className="w-6 h-6" />,
      href: "/chapter",
    },
    {
      name: "Help",
      icon: <QuestionMarkCircleIcon className="w-6 h-6" />,
      href: "help",
    },
    {
      name: "Reports",
      icon: <ChartBarIcon className="w-6 h-6" />,
      href: "reports",
    },
    {
      name: "Settings",
      icon: <Cog6ToothIcon className="w-6 h-6" />,
      href: "/settings",
    },
  ];

  return (
    <aside className="bg-white text-white w-60 h-screen flex flex-col">
      {/* Branding */}
      <div className="flex items-center justify-start px-3 py-3">
        <img src={logo} alt="logo" className="w-28" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 pr-3 py-6 space-y-1">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={() => setActiveLink(item.href)}
            className={`flex text-md font-bold items-center text-gray-500 space-x-3 px-4 py-3 rounded-md transition ${
              activeLink === item.href
                ? "bg-gray-200 text-gray-950 hover:text-black" // Active item with black text and light background
                : "hover:bg-gray-200 hover:text-black" // Hover effect for inactive items
            }`}
          >
            {item.icon}
            {/* Hide text on small screens, show on larger screens */}
            <span className=" hidden sm:block">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
