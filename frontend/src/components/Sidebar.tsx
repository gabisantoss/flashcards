import { useRouter } from "next/router";

import SidebarItem, { SidebarItemProps } from "./SidebarItem";
import DashboardIcon from "./icons/DashboardIcon";
import ExitIcon from "./icons/ExitIcon";
import FlashcardsIcon from "./icons/FlashcardsIcon";
import { useState } from "react";
import StatsIcon from "./icons/StatsIcon";

const Sidebar: React.FC = () => {
  const router = useRouter();

  const linksDefaultValue: SidebarItemProps[] = [
    {
      name: "Study",
      url: "/",
      icon: <FlashcardsIcon />,
      isActive: true,
      onClick: () => {},
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <DashboardIcon />,
      isActive: false,
      onClick: () => {},
    },
    {
      name: "Stats",
      url: "/stats",
      icon: <StatsIcon />,
      isActive: false,
      onClick: () => {},
    },
  ];
  const [links, setLinks] = useState(linksDefaultValue);

  const handleLinkClick = (url: string) => {
    const updatedLinks = links.map((link: SidebarItemProps) =>
      link.url === url
        ? { ...link, isActive: true }
        : { ...link, isActive: false }
    );
    setLinks(updatedLinks);
    router.push(url);
  };

  return (
    <div className="h-full flex flex-col bg-white w-1/4 p-6 border-r-1 border-r-gray-100">
      <div className="flex flex-col gap-4">
        {links.map((link, index) => (
          <SidebarItem
            key={index}
            name={link.name}
            url={link.url}
            icon={link.icon}
            isActive={link.isActive}
            onClick={() => handleLinkClick(link.url)}
          />
        ))}
      </div>
      <div className="flex p-4 w-fit cursor-pointer mt-auto gap-2 items-center">
        <p>Exit</p>
        <ExitIcon />
      </div>
    </div>
  );
};

export default Sidebar;
