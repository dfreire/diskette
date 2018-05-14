import { AxiosStatic } from 'axios';
const axios: AxiosStatic = require('axios'); // used require because it has a mock in 'src/__mocks__'
import { as } from './util';

export interface Messages {
    title: string;
    loginPage: {
        emailField: string;
        passwordField: string;
        loginButton: string;
    };
    contentPage: {
        saveButton: string;
        cancelButton: string;
    };
    createDirModal: {
        title: string;
        nameField: string;
        typeField: string;
        saveButton: string;
    };
    updateDirModal: {
        title: string;
        nameField: string;
        saveButton: string;
    };
};

export interface State {
    messages: Messages;
}

export interface Dispatch {
    setMessages: { (payload: { messages: Messages }): void };
};

export const INITIAL_STATE: State = {
    messages: {
        title: 'Diskette',
        loginPage: {
            emailField: 'Email',
            passwordField: 'Password',
            loginButton: 'Login',
        },
        contentPage: {
            saveButton: 'Save',
            cancelButton: 'Cancel',
        },
        createDirModal: {
            title: 'Create',
            nameField: 'Name',
            typeField: 'Type',
            saveButton: 'Save',
        },
        updateDirModal: {
            title: 'Update',
            nameField: 'Name',
            saveButton: 'Save',
        },
    },
};

const reducers = {
    setMessages(state: State, payload: { messages: Messages }): State {
        const { messages } = payload;
        return { ...state, messages };
    },
};

const effects = {
    async loadMessages(payload: {}, rootState: { ui: State }) {
        try {
            const res = await axios.get('/api/ui/messages.json');
            if (res.status === 200) {
                const messages = res.data;
                as<Dispatch>(this).setMessages({ messages });
            }
        } catch (err) {
            // console.error(err);
            // console.log('err.response', err.response);
        }
    },
};

export const ui = {
    state: { ...INITIAL_STATE },
    reducers,
    effects
};
