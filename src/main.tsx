import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SelectCustomer from "@/pages/SelectCustomer/SelectCustomer.tsx";
import Customer from "@/pages/Customer/Customer.tsx";
import NewCustomer from "./pages/NewCustomer/NewCustomer.tsx";
import NewKarte from "./pages/NewKarte/NewKarte.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectCustomer />,
  },
  {
    path: "customers/:id",
    element: <Customer />,
  },
  {
    path: "customers/new",
    element: <NewCustomer />,
  },
  {
    path: "customers/:id/newKarte",
    element: <NewKarte />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
