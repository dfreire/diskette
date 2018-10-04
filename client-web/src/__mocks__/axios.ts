const defaults = {
  headers: {
    common: {},
  },
};

const get = jest.fn(() => Promise.resolve({ data: null }));

const post = jest.fn(() => Promise.resolve({ data: null }));

export { defaults, get, post };
