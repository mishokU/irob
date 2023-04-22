import { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";

export function ProfileMenuHandlerDelegate() {
  const [menu, setMenu] = useState(ProfileMenu.Rooms);
  return {
    menu,
    setMenu,
  };
}
