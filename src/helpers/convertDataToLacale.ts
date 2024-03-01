export interface Iprops {
  seconds: number;
}

export const convertDataTolocale = (timeValue: Iprops) => {
  return new Date(timeValue?.seconds * 1000).toLocaleString().replace(",", "/");
};
