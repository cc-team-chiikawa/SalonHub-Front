import { customer } from "@/types/customer";
import { loginInformation } from "@/types";

// TODO
export const login = async (loginInformation: loginInformation) => {
  const response = await fetch("/api/customers/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInformation),
  });

  if (!response.ok) {
    throw new Error("Failed to post new customer");
  }

  const customer = await response.json();
  return customer as customer;
};

export const getCustomers = async () => {
  const data = await fetch("/api/customers");
  const customers = await data.json();
  return customers as customer[];
};

export const getCustomer = async (id: string) => {
  const data = await fetch(`/api/customers/${id}`);
  const customers = await data.json();

  // TODO: 日付ソート
  return customers as customer;
};

export const postCustomer = async (newCustomer: customer) => {
  const response = await fetch("/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCustomer),
  });

  if (!response.ok) {
    throw new Error("Failed to post new customer");
  }

  const customer = await response.json();
  return customer as customer;
};

export const patchCustomer = async (id: string, updatedCustomer: customer) => {
  const response = await fetch(`/api/customers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCustomer),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer");
  }

  const customer = await response.json();
  return customer as customer;
};
