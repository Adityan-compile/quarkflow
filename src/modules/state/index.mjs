let state = {};

export const set = (key, value) => {
  state[key] = value;
};

export const get = (key) => {
  return state[key];
};
