const STORE = "store";

export const saveStore = (state) => {
  try {
    localStorage.setItem(STORE, JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

export const getStore = () => {
  try {
    const stateStr = localStorage.getItem(STORE);
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
