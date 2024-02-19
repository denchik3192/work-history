export const convertDataTolocale = (row: any) => {
  return new Date(row.timeValue.seconds * 1000).toLocaleString().replace(",", "/");
};
