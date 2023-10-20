export const setItemsToLS = (notes) => {
    return localStorage.setItem(`history`, JSON.stringify(notes));
  };