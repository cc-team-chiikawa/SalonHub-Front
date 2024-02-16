import { stylist } from "@/types";

export const getStylistMock = async (id: string) => {
  return data[0];
};

export const getStylistsMock = async () => {
  return data;
};

const data: stylist[] = [
  {
    id: "1",
    stylistType: 1,
    loginId: "stylist1",
    name: "中村　祐介",
    kana: "Stylist Kana",
    post: "Stylist Post",
    joinedDate: new Date("2022-01-01"),
    photo: "https://example.com/stylist.jpg",
  },
  {
    id: "2",
    stylistType: 1,
    loginId: "stylist1",
    name: "田中　祐介",
    kana: "Stylist Kana",
    post: "Stylist Post",
    joinedDate: new Date("2022-01-01"),
    photo: "https://example.com/stylist.jpg",
  },
];
