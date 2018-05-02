import { AxiosStatic } from 'axios';
const axios: AxiosStatic = require('axios'); // used require because it has a mock in 'src/__mocks__'
import { logout } from './util';

export interface State {
    sessionToken: string;

    loginPage: {
        email: string;
        password: string;
        errorMessage: string;
    };
}

export interface Dispatch {
    onLoginPageChangeField: { (payload: { key: 'email' | 'password', value: string }): void };

    login: { (): void };
    onLoginError: { (): void };

    logout: { (): void };
};

export const INITIAL_STATE: State = {
    sessionToken: localStorage.getItem('sessionToken') || '',

    loginPage: {
        email: '',
        password: '',
        errorMessage: '',
    },
};

const reducers = {
    onLoginPageChangeField(state: State, payload: { key: 'email' | 'password', value: string }): State {
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
};

const effects = {
    async login(payload: {}, rootState: { user: State }) {
        try {
            const { email, password } = rootState.user.loginPage;
            const res = await axios.post('/api/users/login', { email, password });
            if (res.status === 200) {
                const sessionToken = res.data;
                localStorage.setItem('sessionToken', sessionToken);
                window.location.assign('/content');
            }
        } catch (err) {
            // console.error(err);
            // console.log('err.response', err.response);
            (this as any).onLoginError();
        }
    },

    logout(payload: {}, rootState: { user: State }) {
        logout();
    },
};

export const user = {
    state: { ...INITIAL_STATE },
    reducers,
    effects
};
