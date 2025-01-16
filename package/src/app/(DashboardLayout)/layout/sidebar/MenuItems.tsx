import {
  IconLayoutDashboard,
  IconBuilding,
  IconUsers,
  IconTruck
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
    href: "/utilities/shadow",
  },
  {
    id: uniqueId(),
    title: "Shipments",
    icon: IconTruck,
    href: "/authentication/login",
  },
];

export default Menuitems;
