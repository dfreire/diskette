export interface State {
    sessionToken: string;
}

export interface Dispatch {
    login: { (): void };
    logout: { (): void };
}

const INITIAL_STATE: State = {
    sessionToken: localStorage.getItem('sessionToken') || '',
};

const reducers = {

};

const effects = {
    async login(payload: {}, rootState: { user: State }) {
        const sessionToken = '123';
        localStorage.setItem('sessionToken', sessionToken);
        window.location.href = '/home';
    },

    async logout(payload: {}, rootState: { user: State }) {
        localStorage.removeItem('sessionToken');
        window.location.href = '/logout';
    }
};

export const user = {
    state: { ...INITIAL_STATE },
    reducers,
    effects,
}