import { useRouter } from "next/router";

import SidebarItem, { SidebarItemProps } from "./SidebarItem";
import DashboardIcon from "./icons/DashboardIcon";
import ExitIcon from "./icons/ExitIcon";
import FlashcardsIcon from "./icons/FlashcardsIcon";
import StatsIcon from "./icons/StatsIcon";

const Sidebar: React.FC = () => {
  const router = useRouter();

  const links: SidebarItemProps[] = [
    {
      name: "Study",
      url: "/",
      icon: <FlashcardsIcon />,
      onClick: () => {},
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <DashboardIcon />,
      onClick: () => {},
    },
    {
      name: "Stats",
      url: "/stats",
      icon: <StatsIcon />,
      onClick: () => {},
    },
  ];

  const handleLinkClick = (url: string) => {
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
            isActive={router.pathname === link.url}
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
