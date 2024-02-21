export type customer = {
  id: string;
  card_number?: string;
  birthday?: Date;
  name: string;
  kana?: string;
  gender?: string;
  phone_number?: string;
  adress?: string;
  hair_thickness?: number;
  hair_hardness?: number;
  hair_amount?: number;
  allergy?: string;
  memo1?: string;
  memo2?: string;
  memo3?: string;
  memo4?: string;
  memo5?: string;
};

export type karteHeader = { id: string; treatmentDay: Date };

export const getHairThicknessText = (value: number) => {
  return ["細め", "やや細め", "普通", "やや太め", "太め"][value - 1];
};

export const getHairHardnessText = (value: number) => {
  return ["柔らかめ", "やや柔らかめ", "普通", "やや太め", "太め"][value - 1];
};

export const getHairAmountText = (value: number) => {
  return ["少なめ", "やや少なめ", "普通", "やや多め", "多め"][value - 1];
};

export const getGenderText = (value: number) => {
  return ["男性", "女性", "その他"][value];
};
