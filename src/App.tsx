import { FC, useEffect, useMemo, useState } from "react";
import "./App.css";
import { customer } from "@/types/customer";
import { createApi } from "./apis/createApi";

export const App: FC = () => {
  const [customers, setCustomers] = useState<customer[]>([]);
  const api = useMemo(() => createApi(), []);

  useEffect(() => {
    const getData = async () => {
      const customers = await api.customer.getCustomers();
      setCustomers(customers);
    };

    getData();
  }, []);

  return (
    <div>
      {customers.map((customer) => (
        <p key={customer.id}>{customer.name}</p>
      ))}
    </div>
  );
};

export default App;
