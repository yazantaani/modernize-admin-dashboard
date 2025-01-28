import { Moving } from "@mui/icons-material";
import {
  IconLayoutDashboard,
  IconBuilding,
  IconUsers,
  IconTruck,
  IconShoppingCart,
  IconRoute
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

export const Menuitems = {
  superAdmin: [
    {
      navlabel: true,
      subheader: "Super Admin",
    },
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/",
    },
    {
      id: uniqueId(),
      title: "Users",
      icon: IconUsers,
      href: "/superAdmin/users",
    },
    {
      id: uniqueId(),
      title: "Companies",
      icon: IconBuilding,
      href: "/superAdmin/companies",
    },
    {
      id: uniqueId(),
      title: "Shipments",
      icon: IconTruck,
      href: "/superAdmin/shipments",
    },
  ],
  companyAdmin: [
    {
      navlabel: true,
      subheader: "Company Admin",
    },
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/",
    },
    {
      id: uniqueId(),
      title: "My Trips",
      icon: IconRoute,
      href: "/companyAdmin/Trips",
    },
    {
      id: uniqueId(),
      title: "Shipments",
      icon: IconTruck,
      href: "/companyAdmin/Shipments",
    },
  ],
  user: [
    {
      navlabel: true,
      subheader: "User",
    },
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/user/dashboard",
    },
    {
      id: uniqueId(),
      title: "My Shipments",
      icon: IconTruck,
      href: "/user/shipments",
    },
    {
      id: uniqueId(),
      title: "Orders",
      icon: IconShoppingCart,
      href: "/user/orders",
    },
  ],
};
