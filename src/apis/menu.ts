import { menu } from "@/types";

export const getMenus = async () => {
  const data = await fetch("/api/menus");
  const menus = await data.json();
  return menus as menu[];
};
