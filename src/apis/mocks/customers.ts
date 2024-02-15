import { customer } from "@/types/customer";

export const getCustomersMock = async () => {
  return customers;
};

const customers: customer[] = [
  { id: 1, name: "モック1" },
  { id: 2, name: "モック2" },
];
