export const convertNumberRecord = (idx: number, activePage: any, itemsPerPage: number) => {
    if (activePage == 1) return idx + 1;
    if (String((idx + 1)) === String(itemsPerPage)) return String(activePage+1) + '0';
    return String(activePage) + String(idx + 1);
  };