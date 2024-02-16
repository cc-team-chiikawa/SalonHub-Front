import { menu } from ".";

export type karte = {
  id: string;
  customerId: string;
  stylistId: string;
  treatmentDay: Date;
  order: string;
  memo1: string;
  memo2: string;
  memo3: string;
  memo4: string;
  memo5: string;
  photo: string;
  treatmentedMenuIds: string[];
};
