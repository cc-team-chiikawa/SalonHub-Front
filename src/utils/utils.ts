export const formatDate = (date: Date): string => {
  console.log(typeof date);

  const year = date.getFullYear().toString();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return year + "年" + month + "月" + day + "日";
};
