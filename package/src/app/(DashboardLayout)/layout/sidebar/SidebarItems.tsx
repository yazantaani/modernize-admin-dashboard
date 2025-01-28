import React from "react";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useAppSelector } from "@/app/redux/store";
import { Menuitems } from "./MenuItems";
import { CompressOutlined } from "@mui/icons-material";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  // Fetch the role from Redux state
  // const role = useAppSelector((state) => state.auth.user?.role) || "";
  const role=localStorage.getItem('role');
  console.log("role: ", role);
  // Filter menu items for the current role
  const filteredMenuItems = Menuitems[role as keyof typeof Menuitems] || [];
  console.log("Filtered Menu Items:", filteredMenuItems);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
      {filteredMenuItems.map((item) => {
  console.log("Rendering Menu Item:", item);
  if (item.subheader) {
    return <NavGroup item={item} key={item.subheader} />;
  } else {
    return (
      <NavItem
        item={item}
        key={item.id}
        pathDirect={pathDirect}
        onClick={toggleMobileSidebar}
      />
    );
  }
})}
      </List>
    </Box>
  );
};

export default SidebarItems;
