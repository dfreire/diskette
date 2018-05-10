import axios from 'axios';
import { logoutIf401, as } from './util';

export interface State {
    dirItems: { name: string; friendlyName: string } [];
    contentTypes: string[];
    createDirModal: boolean;
    updateDirModal: boolean;
    name: string;
    type: string;
}

export interface Dispatch {
    clear: { (): void };
    onLoaded: { (payload: { dirNames: string[], contentTypes: string[] }): void };
    setModalVisibility: { (payload: { key: 'createDirModal' | 'updateDirModal', visible: boolean }): void };
    setValue: { (payload: { key: 'name' | 'type', value: string }): void };
    load: { (payload: { pathname: string }): void };
    create: { (payload: { pathname: string }): void };
    update: { (payload: { pathname: string }): void };
    remove: { (payload: { pathname: string }): void };
};

function getInitialState(): State {
    return {
        dirItems: [],
        contentTypes: [],
        createDirModal: false,
        updateDirModal: false,
        name: '',
        type: '',
    };
}

const reducers = {
    clear(state: State): State {
        return getInitialState();
    },

    onLoaded(state: State, payload: { dirNames: string[], contentTypes: string[] }): State {
        const { dirNames } = payload;
        const dirItems = dirNames.map(name => ({ name, friendlyName: name.split('-').slice(1).join('-') }));
        return { ...getInitialState(), dirItems };
    },

    setModalVisibility(state: State, payload: { key: 'createDirModal' | 'updateDirModal', visible: boolean }): State {
        const { key, visible } = payload;
        return { ...state, [key]: visible };
    },

    setValue(state: State, payload: { key: 'name' | 'type', value: string }): State {
        const { key, value } = payload;
        return { ...state, [key]: value };
    },
};

const effects = {
    async load(payload: { pathname: string }, rootState: { dirs: State }) {
        try {
            const { pathname } = payload;

            // substitute '/content' by '/api/dirs' in from the beginning of the pathname
            const url = ['/api/dirs', ...pathname.split('/').filter(t => t.length > 0).slice(1)].join('/');
            const res1 = await axios.get(url);
            const dirNames = res1.data;

            const res2 = await axios.get('/api/types');
            const contentTypes = res2.data;

            as<Dispatch>(this).onLoaded({ dirNames, contentTypes });
        } catch (err) {
            console.error(err);
            logoutIf401(err);
        }
    },
};

export const dirs = {
    state: getInitialState(),
    reducers,
    effects
};
