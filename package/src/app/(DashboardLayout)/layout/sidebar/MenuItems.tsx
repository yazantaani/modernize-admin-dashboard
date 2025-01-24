import {
  IconLayoutDashboard,
  IconBuilding,
  IconUsers,
  IconTruck,
  IconShoppingCart
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
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
    href: "/users",  },
  {
    id: uniqueId(),
    title: "Companies",
    icon: IconBuilding,
    href: "/companies",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: IconTruck,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: IconShoppingCart,
    href: "/authentication/login",
  },
];

export default Menuitems;
