import {
  getCustomers,
  getCustomer,
  login,
  postCustomer,
  patchCustomer,
} from "./customers";
import { getGenres } from "./genre";
import { getKarte, postKarte, patchKarte } from "./karte";

export const createApi = () => {
  const useMock = import.meta.env.MODE === "mock";
  return api;
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
};