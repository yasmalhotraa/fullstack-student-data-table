import React, { useState } from "react";
import {
  BellIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline"; // Heroicons v2 imports
import userIcon from "../../assets/user_placeholder.png";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  return (
    <header className="flex items-center justify-between sm:justify-normal sm:gap-28 bg-[#F6F8FA] px-6 py-4">
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative w-[500px] max-500:w-[200px]">
          {/* Search Icon */}
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search your course"
            className="w-full bg-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden max-500:flex">
        {/* Hamburger Menu Icon */}
        <Bars3Icon
          className="w-8 h-8 text-gray-500 cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />
      </div>

      <div className="flex items-center space-x-8 max-500:hidden">
        {/* Help Button */}
        <div className="relative">
          <QuestionMarkCircleIcon className="w-5 h-5 text-gray-500" />
        </div>

        {/* Chat Message Icon */}
        <div className="relative">
          <ChatBubbleLeftIcon className="w-5 h-5 text-gray-500" />
          <div className="absolute right-[2px] top-[1px] w-[5px] h-[5px] bg-red-500 rounded-full"></div>
        </div>

        {/* Settings Icon */}
        <div className="relative">
          <Cog6ToothIcon className="w-5 h-5 text-gray-500" />
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <BellIcon className="w-5 h-5 text-gray-500" />
          <div className="absolute right-[4px] top-[2px] w-[5px] h-[5px] bg-red-500 rounded-full"></div>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-6">
          <img
            src={userIcon} // Replace with profile image URL
            alt="User"
            className="w-10 bg-[#FFCD66] h-10 rounded-md"
          />
          <span className="hidden sm:block font-medium text-gray-800">
            Adeline H. Dancy
          </span>
        </div>
      </div>

      {/* Small Screen Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-[60px] right-4 w-54 bg-white shadow-lg rounded-md py-4 px-6 z-10">
          <div className="flex flex-col space-y-4">
            {/* Help */}
            <div className="flex items-center space-x-3">
              <QuestionMarkCircleIcon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800">Help</span>
            </div>
            {/* Chat */}
            <div className="flex items-center space-x-3">
              <ChatBubbleLeftIcon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800">Chat</span>
            </div>
            {/* Settings */}
            <div className="flex items-center space-x-3">
              <Cog6ToothIcon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800">Settings</span>
            </div>
            {/* Notifications */}
            <div className="flex items-center space-x-3">
              <BellIcon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800">Notifications</span>
            </div>
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <img
                src={userIcon} // Replace with profile image URL
                alt="User"
                className="w-10 bg-[#FFCD66] h-10 rounded-md"
              />
              <span className="text-gray-800">Adeline H. Dancy</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
