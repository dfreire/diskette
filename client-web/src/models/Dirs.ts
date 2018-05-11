import axios from 'axios';
import * as slug from 'slugg';
import { logoutIf401, as } from './util';

type DirItem = { name: string; friendlyName: string };

export interface State {
    dirItems: DirItem[];
    contentTypes: string[];
    showCreateModal: boolean;
    showUpdateModal: boolean;
    modalData: {
        dirItem: DirItem;
        contentType: string;
    };
}

export interface Dispatch {
    clear: { (): void };
    onLoaded: { (payload: { dirNames: string[], contentTypes: string[] }): void };
    optimisticReorder: { (payload: { oldPos: number; newPos: number }): void };
    openCreateModal: { (): void };
    openUpdateModal: { (payload: { dirItem: DirItem }): void };
    closeModals: { (): void };
    setModalFriendlyName: { (payload: { friendlyName: string }): void };
    setModalContentType: { (payload: { contentType: string }): void };
    load: { (payload: { pathname: string }): void };
    create: { (payload: { pathname: string }): void };
    update: { (payload: { pathname: string }): void };
    reorder: { (payload: { pathname: string, oldName: string, oldPos: number, newPos: number }): void };
    remove: { (payload: { pathname: string, dirItem: DirItem }): void };
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
        const { dirNames, contentTypes } = payload;
        const dirItems = dirNames.map(name => ({ name, friendlyName: name.split('-').slice(1).join('-') }));
        return { ...getInitialState(), dirItems, contentTypes };
    },

    optimisticReorder(state: State, payload: { oldPos: number; newPos: number }): State {
        const { oldPos, newPos } = payload;
        const dirItems = [...state.dirItems];
        const movingItem = dirItems.splice(oldPos, 1)[0];
        dirItems.splice(newPos, 0, movingItem);
        return { ...state, dirItems };
    },

    openCreateModal(state: State): State {
        const dirItem = { name: '', friendlyName: '' };
        const modalData = { dirItem, contentType: state.contentTypes[0] };
        return { ...state, showCreateModal: true, showUpdateModal: false, modalData };
    },

    openUpdateModal(state: State, payload: { dirItem: DirItem }): State {
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

    async create(payload: { pathname: string }, rootState: { dirs: State }) {
        try {
            const { pathname } = payload;
            const { modalData } = rootState.dirs;
            const { friendlyName } = modalData.dirItem;
            const { contentType } = modalData;

            // substitute '/content' by '/api/dirs' in from the beginning of the pathname
            const url = ['/api/dirs', ...pathname.split('/').filter(t => t.length > 0).slice(1)].join('/');
            await axios.post(url, { friendlyName, contentType });

            as<Dispatch>(this).load({ pathname });
        } catch (err) {
            console.error(err);
            logoutIf401(err);
        }
    },

    async update(payload: { pathname: string }, rootState: { dirs: State }) {
        try {
            const { pathname } = payload;
            const { modalData } = rootState.dirs;
            const { friendlyName } = modalData.dirItem;
            const oldName = modalData.dirItem.name;
            const oldPos = modalData.dirItem.name.split('-')[0];
            const newName = `${oldPos}-${slug(friendlyName)}`;

            // substitute '/content' by '/api/dirs' in from the beginning of the pathname
            const url = ['/api/dirs', ...pathname.split('/').filter(t => t.length > 0).slice(1)].join('/');
            await axios.put(url, { oldName, newName });

            as<Dispatch>(this).load({ pathname });
        } catch (err) {
            console.error(err);
            logoutIf401(err);
        }
    },

    async reorder(payload: { pathname: string, oldName: string, oldPos: number, newPos: number }, rootState: { dirs: State }) {
        try {
            const { pathname, oldName, oldPos, newPos } = payload;
            as<Dispatch>(this).optimisticReorder({ oldPos, newPos });

            const nameTokens = oldName.split('-');
            nameTokens[0] = `${newPos}`;
            const newName = nameTokens.join('-');

            // substitute '/content' by '/api/dirs' in from the beginning of the pathname
            const url = ['/api/dirs', ...pathname.split('/').filter(t => t.length > 0).slice(1)].join('/');
            await axios.put(url, { oldName, newName });

            as<Dispatch>(this).load({ pathname });
        } catch (err) {
            console.error(err);
            logoutIf401(err);
        }
    },

    async remove(payload: { pathname: string, dirItem: DirItem }, rootState: { dirs: State }) {
        try {
            const { pathname, dirItem } = payload;
            const name = dirItem.name;

            // substitute '/content' by '/api/dirs' in from the beginning of the pathname
            const url = ['/api/dirs', ...pathname.split('/').filter(t => t.length > 0).slice(1)].join('/');
            await axios.delete(`${url}/${name}`);

            as<Dispatch>(this).load({ pathname });
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
