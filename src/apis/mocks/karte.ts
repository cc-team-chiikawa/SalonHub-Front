import { karte } from "@/types/karte";

export const getKarteMock = async (id: string) => {
  return data.find((karte) => karte.id === id);
};

export const postKarteMock = async (newKarte: karte) => {
  return newKarte;
};

export const patchKarteMock = async (id: string, updatedKarte: karte) => {
  return updatedKarte;
};

const data: karte[] = [
  {
    id: "1",
    customerId: "1",
    stylistId: "1",
    treatmentDay: new Date("2022-01-01"),
    order: "短めにして、カラーリングは暗めの色にしたい",
    memo1:
      "結構癖っ毛で長いとスタイリングは大変そう。なので短めの髪型にし、スタイリングにはジェルを使うことおすすめ",
    memo2: "This is memo2",
    memo3: "This is memo3",
    memo4: "This is memo4",
    memo5: "This is memo5",
    photo: "https://example.com/photo.jpg",
    treatmentedMenuIds: ["1", "2"],
  },
  {
    id: "2",
    customerId: "1",
    stylistId: "1",
    treatmentDay: new Date("2023-01-01"),
    order: "短めにして、カラーリングは暗めの色にしたい!!!!!",
    memo1:
      "結構癖っ毛で長いとスタイリングは大変そう。なので短めの髪型にし、スタイリングにはジェルを使うことおすすめ!!!!!",
    memo2: "This is memo2",
    memo3: "This is memo3",
    memo4: "This is memo4",
    memo5: "This is memo5",
    photo: "https://example.com/photo.jpg",
    treatmentedMenuIds: ["1", "2"],
  },
];
