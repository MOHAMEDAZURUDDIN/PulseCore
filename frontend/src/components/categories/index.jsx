import { GiWatch } from "react-icons/gi";
import { PiSunglassesDuotone } from "react-icons/pi";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaRing } from "react-icons/fa";
import { FaRedhat } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";

import { Colors } from "../../themes";

export const Accessories = [
  { item: "Watches", icon: <GiWatch size={24} color={Colors.danger} /> },
  {
    item: "Sunglasses",
    icon: <PiSunglassesDuotone size={24} color={Colors.teal} />,
  },
  {
    item: "Bags",
    icon: <BsFillHandbagFill size={24} color={Colors.dragonmonkey} />,
  },
  { item: "Jewelry", icon: <FaRing size={24} color={Colors.midnightmonkey} /> },
  { item: "Hats", icon: <FaRedhat size={24} color={Colors.primary} /> },
  {
    item: "Footwear",
    icon: <GiRunningShoe size={24} color={Colors.inverse} />,
  },
];
