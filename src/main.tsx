import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SelectCustomer from "@/pages/SelectCustomer/SelectCustomer.tsx";
import Customer from "@/pages/Customer/Customer.tsx";
import NewCustomer from "./pages/NewCustomer/NewCustomer.tsx";
import NewKarte from "./pages/NewKarte/NewKarte.tsx";
import { extendTheme } from "@chakra-ui/react";
import styles from "./main.module.scss";

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

const theme = extendTheme({
  colors: {
    brandOrange: {
      500: "#ffa500",
      100: "#ffecb3",
    },
    brandGray: {
      500: "#f7f7f7",
      0: "#ffffff",
    },
    brandGreen: {
      500: "#008080",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
