import React, { createContext, useContext, useState, ReactNode } from "react";
import { customer as Customer } from "./types";

export type MyContextType = {
  customer: Customer | undefined;
  customerDetail: Customer | undefined;
  image: string;
  setCustomer: (customer: Customer | undefined) => void; // setCustomer 関数の型もContextに含める
  setCustomerDetail: (customer: Customer | undefined) => void; // setCustomer 関数の型もContextに含める
  setImage: (image: string) => void; // setImage 関数の型もContextに含める
};

// データを共有するためのContextを作成
const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }

  return context;
};

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | undefined>({
    id: "",
    name: "",
    birthday: new Date(),
  });
  const [customerDetail, setCustomerDetail] = useState<Customer | undefined>({
    id: "",
    name: "",
    birthday: new Date(),
  });
  const [image, setImage] = useState("");

  const value = {
    customer,
    customerDetail,
    image,
    setCustomer,
    setCustomerDetail,
    setImage,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
