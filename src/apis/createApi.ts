import { getCustomers } from "@/apis/customers";
import { getCustomersMock } from "@/apis/mocks/customers";

export const createApi = () => {
  const useMock = import.meta.env.MODE === "mock";

  return {
    getCustomers: useMock ? getCustomersMock : getCustomers,
  };
};
