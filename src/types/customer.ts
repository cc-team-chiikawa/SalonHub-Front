export type customer = {
  id: string;
  cardNumber: string;
  birthday: Date;
  name: string;
  kana: string;
  gender: string;
  phoneNumber: string;
  address: string;
  hairThickness: string;
  hairHardness: string;
  hairAmount: string;
  allergy: string;
  memo1: string;
  memo2: string;
  memo3: string;
  memo4: string;
  memo5: string;

  kartes: karteHeader[];
};

export type karteHeader = { id: string; treatmentDay: Date };
