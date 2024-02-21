import { HairLength } from "../types/enum";

export const formatDate = (date: Date): string => {
  console.log(typeof date);

  const year = date.getFullYear().toString();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return year + "年" + month + "月" + day + "日";
};

// _を（に置換
// _を含む場合は末尾に）を追加
export const getHairLengthText = (hairLength: HairLength): string => {
  let temp = HairLength[hairLength].replace("_", "（");
  if (temp.includes("_")) {
    temp = temp + "）";
  }
  return temp;
};
