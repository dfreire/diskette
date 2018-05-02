const get = jest.fn(() => Promise.resolve({ data: null }));

const post = jest.fn(() => Promise.resolve({ data: null }));

export { get, post };