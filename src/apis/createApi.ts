import {
  getCustomers,
  getCustomer,
  login,
  postCustomer,
  patchCustomer,
} from "./customers";
import {
  getCustomerMock,
  getCustomersMock,
  loginMock,
  postCustomerMock,
  patchCustomerMock,
} from "./mocks/customers";
import { getGenres } from "./genre";
import { getKarte, postKarte, patchKarte } from "./karte";
import { getMenus } from "./menu";
import { getStylists, getStylist } from "./stylist";
import { getGenresMock } from "./mocks/genre";
import { getKarteMock, postKarteMock, patchKarteMock } from "./mocks/karte";
import { getMenusMock } from "./mocks/menu";
import { getStylistMock, getStylistsMock } from "./mocks/stylist";

export const createApi = () => {
  const useMock = import.meta.env.MODE === "mock";
  return useMock ? mockApi : api;
};

const api = {
  customer: {
    getCustomer,
    getCustomers,
    login,
    postCustomer,
    patchCustomer,
  },
  genre: {
    getGenres,
  },
  karte: {
    getKarte,
    postKarte,
    patchKarte,
  },
  menu: {
    getMenus,
  },
  stylist: {
    getStylist,
    getStylists,
  },
};

const mockApi = {
  customer: {
    getCustomer: getCustomerMock,
    getCustomers: getCustomersMock,
    login: loginMock,
    postCustomer: postCustomerMock,
    patchCustomer: patchCustomerMock,
  },
  genre: {
    getGenres: getGenresMock,
  },
  karte: {
    getKarte: getKarteMock,
    postKarte: postKarteMock,
    patchKarte: patchKarteMock,
  },
  menu: {
    getMenus: getMenusMock,
  },
  stylist: {
    getStylist: getStylistMock,
    getStylists: getStylistsMock,
  },
};
