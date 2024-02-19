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
    // TODO: エラーハンドリング
    throw new Error("Failed to post new customer");
  }

  const customer = await response.json();
  return customer as { id: string };
};

export const getCustomers = async () => {
  const data = await fetch("/api/customers");
  const customers = await data.json();

  customers.forEach((customer: customer) => {
    // 日付を Date オブジェクトに変換
    if (customer.birthday) {
      customer.birthday = new Date(customer.birthday);
    }
  });

  return customers as customer[];
};

export const getCustomer = async (id: string) => {
  const data = await fetch(`/api/customers/${id}`);
  const customer = await data.json();

  // 日付を Date オブジェクトに変換
  if (customer.birthday) {
    customer.birthday = new Date(customer.birthday);
  }

  if (customer.kartes) {
    customer.kartes = customer.kartes.map((karte) => ({
      id: karte.id,
      treatmentDay: new Date(karte.treatment_day),
    }));
  }

  return customer as customer;
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

  // 日付を Date オブジェクトに変換
  if (customer.birthday) {
    customer.birthday = new Date(customer.birthday);
  }

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

  // 日付を Date オブジェクトに変換
  if (customer.birthday) {
    customer.birthday = new Date(customer.birthday);
  }

  return customer as customer;
};
