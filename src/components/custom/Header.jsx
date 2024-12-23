import React from "react";
import {
  BellIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline"; // Heroicons v2 imports
import userIcon from "../../assets/user_placeholder.png";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    <header className="flex items-center justify-between max-500:justify-normal bg-[#F6F8FA] px-6 py-4">
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
      <div className="flex items-center space-x-8">
        {/* Help Button */}
        <div className="relative">
          <QuestionMarkCircleIcon className="w-5 h-5 text-gray-500" />
        </div>

        {/* Chat Message Icon Button */}
        <div className=" relative">
          {/* Chat bubble icon */}
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
          <div className="absolute right-[4px] top-[2px] w-[5px] h-[5px] bg-red-500 rounded-full "></div>
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
    </header>
  );
};

export default Header;
