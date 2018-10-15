import axios from 'axios';
import * as slug from 'slugg';
import { logoutIf401, as } from './util';

export type DirItem = { name: string; friendlyName: string; contentType: string };

type LoadedItem = { name: string; type: string };

export interface State {
  dirItems: DirItem[];
  modalDirItem: DirItem;
  showCreateModal: boolean;
  showUpdateModal: boolean;
}

export interface Dispatch {
  clear: { (): void };
  onLoaded: { (payload: { loadedItems: LoadedItem[] }): void };
  optimisticReorder: { (payload: { oldPos: number; newPos: number }): void };
  openCreateModal: { (payload: { firstContentType: string }): void };
  openUpdateModal: { (payload: { dirItem: DirItem }): void };
  closeModals: { (): void };
  setModalFriendlyName: { (payload: { friendlyName: string }): void };
  setModalContentType: { (payload: { contentType: string }): void };
  load: { (payload: { pathname: string }): void };
  create: { (payload: { pathname: string }): void };
  update: { (payload: { pathname: string }): void };
  reorder: { (payload: { pathname: string; oldName: string; oldPos: number; newPos: number }): void };
  remove: { (payload: { pathname: string; dirItem: DirItem }): void };
}

function getInitialState(): State {
  return {
    dirItems: [],
    modalDirItem: { name: '', friendlyName: '', contentType: '' },
    showCreateModal: false,
    showUpdateModal: false,
  };
}

const reducers = {
  clear(state: State): State {
    return getInitialState();
  },

  onLoaded(state: State, payload: { loadedItems: LoadedItem[] }): State {
    const { loadedItems } = payload;
    const dirItems = loadedItems.map(loadedItem => ({
      name: loadedItem.name,
      friendlyName: loadedItem.name
        .split('-')
        .slice(1)
        .join('-'),
      contentType: loadedItem.type,
    }));
    return { ...getInitialState(), dirItems };
  },

  optimisticReorder(state: State, payload: { oldPos: number; newPos: number }): State {
    const { oldPos, newPos } = payload;
    const dirItems = [...state.dirItems];
    const movingItem = dirItems.splice(oldPos, 1)[0];
    dirItems.splice(newPos, 0, movingItem);
    return { ...state, dirItems };
  },

  openCreateModal(state: State, payload: { firstContentType: string }): State {
    const { firstContentType } = payload;
    const { modalDirItem } = getInitialState();
    modalDirItem.contentType = firstContentType;
    return { ...state, showCreateModal: true, showUpdateModal: false, modalDirItem };
  },

  openUpdateModal(state: State, payload: { dirItem: DirItem }): State {
    const { dirItem } = payload;
    return { ...state, showCreateModal: false, showUpdateModal: true, modalDirItem: dirItem };
  },

  closeModals(state: State): State {
    return { ...state, showCreateModal: false, showUpdateModal: false };
  },

  setModalFriendlyName(state: State, payload: { friendlyName: string }): State {
    const { friendlyName } = payload;
    const modalDirItem = { ...state.modalDirItem, friendlyName };
    return { ...state, modalDirItem };
  },

  setModalContentType(state: State, payload: { contentType: string }): State {
    const { contentType } = payload;
    const modalDirItem = { ...state.modalDirItem, contentType };
    return { ...state, modalDirItem };
  },
};

const effects = {
  async load(payload: { pathname: string }, rootState: { dirs: State }) {
    try {
      const { pathname } = payload;

      // substitute '/content' by '/api/dirs' in from the beginning of the pathname
      const url = [
        '/api/dirs',
        ...pathname
          .split('/')
          .filter(t => t.length > 0)
          .slice(1),
      ].join('/');
      const res = await axios.get(url);
      const loadedItems = res.data;

      as<Dispatch>(this).onLoaded({ loadedItems });
    } catch (err) {
      console.error(err);
      logoutIf401(err);
    }
  },

  async create(payload: { pathname: string }, rootState: { dirs: State }) {
    try {
      const { pathname } = payload;
      const { modalDirItem } = rootState.dirs;
      const { friendlyName, contentType } = modalDirItem;

      // substitute '/content' by '/api/dirs' in from the beginning of the pathname
      const url = [
        '/api/dirs',
        ...pathname
          .split('/')
          .filter(t => t.length > 0)
          .slice(1),
      ].join('/');
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
      const { modalDirItem } = rootState.dirs;
      const { name, friendlyName, contentType } = modalDirItem;
      const oldName = name;
      const oldPos = name.split('-')[0];
      const newName = `${oldPos}-${slug(friendlyName)}`;

      // substitute '/content' by '/api/dirs' in from the beginning of the pathname
      const url = [
        '/api/dirs',
        ...pathname
          .split('/')
          .filter(t => t.length > 0)
          .slice(1),
      ].join('/');
      await axios.put(url, { oldName, newName, contentType });

      as<Dispatch>(this).load({ pathname });
    } catch (err) {
      console.error(err);
      logoutIf401(err);
    }
  },

  async reorder(
    payload: { pathname: string; oldName: string; oldPos: number; newPos: number },
    rootState: { dirs: State },
  ) {
    try {
      const { pathname, oldName, oldPos, newPos } = payload;
      as<Dispatch>(this).optimisticReorder({ oldPos, newPos });

      const nameTokens = oldName.split('-');
      nameTokens[0] = `${newPos}`;
      const newName = nameTokens.join('-');

      // substitute '/content' by '/api/dirs' in from the beginning of the pathname
      const url = [
        '/api/dirs',
        ...pathname
          .split('/')
          .filter(t => t.length > 0)
          .slice(1),
      ].join('/');
      await axios.put(url, { oldName, newName });

      as<Dispatch>(this).load({ pathname });
    } catch (err) {
      console.error(err);
      logoutIf401(err);
    }
  },

  async remove(payload: { pathname: string; dirItem: DirItem }, rootState: { dirs: State }) {
    try {
      const { pathname, dirItem } = payload;
      const name = dirItem.name;

      // substitute '/content' by '/api/dirs' in from the beginning of the pathname
      const url = [
        '/api/dirs',
        ...pathname
          .split('/')
          .filter(t => t.length > 0)
          .slice(1),
      ].join('/');
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
  effects,
};
