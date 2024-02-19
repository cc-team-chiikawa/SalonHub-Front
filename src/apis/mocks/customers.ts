import { loginInformation } from "@/types";
import { customer } from "@/types/customer";

export const loginMock = async (loginInformation: loginInformation) => {
  return { id: customers[0].id };
};

export const getCustomerMock = async (id: string) => {
  return customers[0];
};

export const getCustomersMock = async () => {
  return customers;
};

export const postCustomerMock = async (newCustomer: customer) => {
  return newCustomer;
};

export const patchCustomerMock = async (
  id: string,
  updatedCustomer: customer
) => {
  return updatedCustomer;
};

const customers: customer[] = [
  {
    id: "1",
    card_number: "1234567890",
    birthday: new Date(),
    name: "ハチワレ",
    kana: "ハチワレ",
    gender: "1",
    phone_number: "090-1234-5678",
    adress: "testuser@example.com",
    hair_thickness: 3,
    hair_hardness: 3,
    hair_amount: 5,
    allergy: "化学薬品、そば粉、アルコール、タマゴ、エビ",
    memo1: "メモ1",
    memo2: "メモ2",
    memo3: "メモ3",
    memo4: "メモ4",
    memo5: "メモ5",
    kartes: [
      { id: "1", treatmentDay: new Date("2022-01-01") },
      { id: "2", treatmentDay: new Date("2023-01-01") },
    ],
  },
  {
    id: "2",
    card_number: "1234567890",
    birthday: new Date(),
    name: "高橋 朱美2",
    kana: "タカハシ アケミ",
    gender: "2",
    phone_number: "090-1234-5678",
    adress: "testuser@example.com",
    hair_thickness: 3,
    hair_hardness: 3,
    hair_amount: 5,
    allergy: "なし",
    memo1: "メモ1",
    memo2: "メモ2",
    memo3: "メモ3",
    memo4: "メモ4",
    memo5: "メモ5",
    kartes: [
      { id: "1", treatmentDay: new Date() },
      { id: "2", treatmentDay: new Date() },
    ],
  },
];
