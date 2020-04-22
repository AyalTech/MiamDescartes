export const loadState = (attribute) => {
  try {
    const serializedState = localStorage.getItem(attribute);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, attribute) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(attribute, serializedState);
  } catch (err) {
    // ignore
  }
};
