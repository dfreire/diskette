import axios from 'axios';
import * as UserModel from './User';
import * as Types from './Types';
import { logoutIf401, as } from './util';

export interface State {
    contentPage: {
        content: Types.Content;
        contentType: Types.ContentType;
        errorMessage: string;
    };
}

export interface Dispatch {
    clear: { (): void };
    load: { (payload: { pathname: string }): void };
    onLoaded: { (payload: { content: Types.Content, contentType: Types.ContentType }): void };
    setValue: { (payload: { key: string; value: any }): void };
    upload: { (payload: { pathname: string; fileKey: string; fileList: FileList }): void };
    save: { (payload: { pathname: string }): void };
};

function getInitialState(): State {
    return {
        contentPage: {
            content: {
                type: '',
                fields: {},
                subDirs: [],
            },
            contentType: {
                title: '',
                tabs: [],
            },
            errorMessage: '',
        },
    };
}

const reducers = {
    clear(state: State) {
        return getInitialState();
    },

    onLoaded(state: State, payload: { content: Types.Content, contentType: Types.ContentType }) {
        const { content, contentType } = payload;
        const contentPage = { ...getInitialState().contentPage, content, contentType };
        return { ...state, contentPage };
    },

    setValue(state: State, payload: { key: string; value: any }) {
        const { key, value } = payload;
        const contentPage = { ...state.contentPage };
        contentPage.content.fields[key] = value;
        return { ...state, contentPage };
    },
};

const effects = {
    async load(payload: { pathname: string }, rootState: { content: State, user: UserModel.State }) {
        try {
            const { pathname } = payload;
            const res1 = await axios.get(`/api${pathname}`);
            const content = res1.data;

            const res2 = await axios.get(`/api/types/${content.type}`);
            const contentType = res2.data;

            as<Dispatch>(this).onLoaded({ content, contentType });
        } catch (err) {
            console.error(err);
            logoutIf401(err);
        }
    },

    async upload(payload: { pathname: string; fileKey: string; fileList: FileList }, rootState: { content: State, user: UserModel.State }) {
        try {
            const { pathname, fileKey, fileList } = payload;

            // substitute '/content' by '/api/files' in from the beginning of the pathname
            const url = ['/api/files', ...pathname.split('/').filter(t => t.length > 0).slice(1)].join('/');

            const data = new FormData();
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList.item(i);
                if (file != null) {
                    data.append('files', file);
                }
            }

            const res = await axios.post(url, data);
            const fileName = res.data[0];

            as<Dispatch>(this).setValue({ key: fileKey, value: fileName });
        } catch (err) {
            console.error(err);
            logoutIf401(err);
        }
    },

    async save(payload: { pathname: string }, rootState: { content: State, user: UserModel.State }) {
        try {
            const { pathname } = payload;
            const { content } = rootState.content.contentPage;
            await axios.post(`/api${pathname}`, content);
        } catch (err) {
            console.error(err);
            logoutIf401(err);
        }
    },
};

export const content = {
    state: getInitialState(),
    reducers,
    effects
};
