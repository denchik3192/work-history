export const getItemsFromLS = () => {
    const data = localStorage.getItem('history');
    return data ? JSON.parse(data) : [];
  };