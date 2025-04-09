import React, { useState } from "react";

export interface SidebarItemProps {
  name: string;
  url: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: (url: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  url,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer rounded-md ${
        isActive ? "bg-gray-100" : ""
      }`}
      onClick={() => onClick(url)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <p className={isActive ? "text-primary" : "text-gray-800"}>{name}</p>
    </div>
  );
};

export default SidebarItem;
