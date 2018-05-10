import axios from 'axios';
import { logoutIf401, as } from './util';

export interface State {
    dirItems: { name: string; friendlyName: string }[];
    contentTypes: string[];
    showCreateModal: boolean;
    showUpdateModal: boolean;
    modalData: {
        dirItem: { name: string; friendlyName: string };
        contentType: string;
    };
}

export interface Dispatch {
    clear: { (): void };
    onLoaded: { (payload: { dirNames: string[], contentTypes: string[] }): void };
    openCreateModal: { (): void };
    openUpdateModal: { (payload: { dirItem: { name: string; friendlyName: string } }): void };
    closeModals: { (): void };
    setModalFriendlyName: { (payload: { friendlyName: string }): void };
    setModalContentType: { (payload: { contentType: string }): void };
    load: { (payload: { pathname: string }): void };
    create: { (payload: { pathname: string }): void };
    update: { (payload: { pathname: string }): void };
    remove: { (payload: { pathname: string }): void };
};

function getInitialState(): State {
    return {
        dirItems: [],
        contentTypes: [],
        showCreateModal: false,
        showUpdateModal: false,
        modalData: {
            dirItem: { name: '', friendlyName: '' },
            contentType: '',
        },
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

    openCreateModal(state: State): State {
        const dirItem = { name: '', friendlyName: '' };
        const modalData = { dirItem, contentType: '' };
        return { ...state, showCreateModal: true, showUpdateModal: false, modalData };
    },

    openUpdateModal(state: State, payload: { dirItem: { name: string; friendlyName: string } }): State {
        const { dirItem } = payload;
        const modalData = { dirItem, contentType: '' };
        return { ...state, showCreateModal: false, showUpdateModal: true, modalData };
    },

    closeModals(state: State): State {
        return { ...state, showCreateModal: false, showUpdateModal: false };
    },

    setModalFriendlyName(state: State, payload: { friendlyName: string }): State {
        const { friendlyName } = payload;
        const modalData = { ...state.modalData };
        modalData.dirItem.friendlyName = friendlyName;
        return { ...state, modalData };
    },

    setModalContentType(state: State, payload: { contentType: string }): State {
        const { contentType } = payload;
        const modalData = { ...state.modalData };
        modalData.contentType = contentType;
        return { ...state, modalData };
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
