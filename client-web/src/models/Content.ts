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
    onLoading: { (): void };

    onLoad: { (payload: { pathname: string }): void };
    onLoaded: { (payload: { content: Types.Content, contentType: Types.ContentType }): void };

    onContentFieldChange: { (payload: { key: string; value: any }): void };

    onSave: { (payload: { pathname: string }): void };
};

const INITIAL_STATE: State = {
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

const reducers = {
    onLoading(state: State) {
        const contentPage = { ...INITIAL_STATE.contentPage };
        return { ...state, contentPage };
    },

    onLoaded(state: State, payload: { content: Types.Content, contentType: Types.ContentType }) {
        const { content, contentType } = payload;
        const contentPage = { ...INITIAL_STATE.contentPage, content, contentType };
        return { ...state, contentPage };
    },

    onContentFieldChange(state: State, payload: { key: string; value: any }) {
        const { key, value } = payload;
        const contentPage = { ...state.contentPage };
        contentPage.content.fields[key] = value;
        return { ...state, contentPage };
    },
};

const effects = {
    async onLoad(payload: { pathname: string }, rootState: { content: State, user: UserModel.State }) {
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

    async onSave(payload: { pathname: string }, rootState: { content: State, user: UserModel.State }) {
        try {
            const { pathname } = payload;
            const { content } = rootState.content.contentPage;
            const res = await axios.post(`/api${pathname}`, content);
            console.log('res', res);
        } catch (err) {
            console.error(err);
            logoutIf401(err);
        }
    }
};

export const content = {
    state: { ...INITIAL_STATE },
    reducers,
    effects
};
