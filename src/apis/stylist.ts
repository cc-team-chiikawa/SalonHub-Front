import { stylist } from "@/types";

export const getStylists = async () => {
  const data = await fetch("/api/stylists");
  const stylists = await data.json();
  return stylists as stylist[];
};

export const getStylist = async (id: string) => {
  const data = await fetch(`/api/stylists/${id}`);
  const stylist = await data.json();

  return stylist as stylist;
};
