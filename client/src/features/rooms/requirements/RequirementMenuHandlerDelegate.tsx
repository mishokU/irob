import { useState } from "react";
import {RequirementsMenu} from "./RequirementsMenu";

export function RequirementMenuHandlerDelegate() {
  const [menu, setMenu] = useState(RequirementsMenu.NEW);
  return {
    menu,
    setMenu,
  };
}