import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainMenu from "./pages/MainMenu/MainMenu.tsx";
import SelectCustomer from "@/pages/SelectCustomer/SelectCustomer.tsx";
import NewKarte from "./pages/NewKarte/NewKarte.tsx";
import Hairstyle from "./pages/Hairstyle/Hairstyle.tsx";
import Sent from "@/pages/Sent/Sent.tsx";
import CustomersList from "@/pages/CustomersList/CustomersList.tsx";
import Customer from "@/pages/Customer/Customer.tsx";
import { extendTheme } from "@chakra-ui/react";
import styles from "./main.module.scss";
import { MyProvider } from "./MyContext.tsx";

const router = createBrowserRouter([
  // メインメニュー
  {
    path: "/",
    element: <MainMenu />,
  },

  // 顧客モード
  {
    path: "customers/select-customer",
    element: <SelectCustomer />,
  },
  {
    path: "customers/new-karte",
    element: <NewKarte />,
  },
  {
    path: "customers/hairstyle",
    element: <Hairstyle />,
  },
  {
    path: "customers/sent",
    element: <Sent />,
  },

  // 美容師モード
  {
    path: "stylist/list",
    element: <CustomersList />,
  },
  {
    path: "stylist/detail",
    element: <Customer />,
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
      <MyProvider>
        <RouterProvider router={router} />
      </MyProvider>
    </ChakraProvider>
  </React.StrictMode>
);
