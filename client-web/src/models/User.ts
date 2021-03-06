import { AxiosStatic } from 'axios';
const axios: AxiosStatic = require('axios'); // used require because it has a mock in 'src/__mocks__'
import { logout, as } from './util';

const sessionToken = localStorage.getItem('sessionToken') || '';
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`;

export interface State {
  sessionToken: string;

  loginPage: {
    username: string;
    password: string;
    errorMessage: string;
  };

  isLogginIn: boolean;
}

export interface Dispatch {
  setValue: { (payload: { key: 'username' | 'password'; value: string }): void };
  setIsLogginIn: { (payload: { isLogginIn: boolean }): void };
  login: { (): void };
  onLoginError: { (): void };
  logout: { (): void };
}

export const INITIAL_STATE: State = {
  sessionToken,

  loginPage: {
    username: '',
    password: '',
    errorMessage: '',
  },

  isLogginIn: false,
};

const reducers = {
  setValue(state: State, payload: { key: 'username' | 'password'; value: string }): State {
    const { key, value } = payload;
    const loginPage = { ...state.loginPage };
    loginPage[key] = value;
    return { ...state, loginPage };
  },

  onLoginError(state: State): State {
    const loginPage = { ...state.loginPage };
    loginPage.errorMessage = 'Access Denied';
    return { ...state, loginPage };
  },

  setIsLogginIn(state: State, payload: { isLogginIn: boolean }) {
    const { isLogginIn } = payload;
    return { ...state, isLogginIn };
  },
};

const effects = {
  async login(payload: {}, rootState: { user: State }) {
    as<Dispatch>(this).setIsLogginIn({ isLogginIn: true });
    const { username, password } = rootState.user.loginPage;

    setTimeout(async () => {
      try {
        const res = await axios.post('/api/users/login', { username, password });
        if (res.status === 200) {
          const sessionToken = res.data;
          localStorage.setItem('sessionToken', sessionToken);
          window.location.assign('/content');
        }
      } catch (err) {
        // console.error(err);
        // console.log('err.response', err.response);
        as<Dispatch>(this).setIsLogginIn({ isLogginIn: false });
        as<Dispatch>(this).onLoginError();
      }
    }, 500);
  },

  logout(payload: {}, rootState: { user: State }) {
    logout();
  },
};

export const user = {
  state: { ...INITIAL_STATE },
  reducers,
  effects,
};
