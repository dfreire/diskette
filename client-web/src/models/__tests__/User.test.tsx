import { init } from "@rematch/core";
import { State, Dispatch } from '../User';

window.location.assign = jest.fn();

describe('when the user is logged out', () => {

    describe('and tries to login with the right credentials', () => {
        const email = 'the_right_email';
        const password = 'the_right_password';
        const sessionToken = 'a_session_token';
        const serverResponse = { status: 200, data: sessionToken };
        let axios: any;

        beforeAll(async () => {
            jest.resetModules();
            axios = require('axios');
            const { user } = require('../User');

            localStorage.clear();
            axios.post.mockClear();
            axios.post.mockImplementationOnce(() => Promise.resolve(serverResponse));

            const store = init({ models: { user } });
            (store.dispatch['user'] as Dispatch).onLoginPageChangeField({ key: 'email', value: email });
            (store.dispatch['user'] as Dispatch).onLoginPageChangeField({ key: 'password', value: password });

            await (store.dispatch['user'] as Dispatch).login();
        });

        it('sends the right credentials to the backend', () => {
            expect(axios.post).toHaveBeenCalledWith('/api/users/login', { email, password });
        });

        it('should store the sesstionToken in the localStorage', () => {
            expect(window.localStorage.getItem('sessionToken')).toEqual(sessionToken);
        });

        it('should redirect to the content page', () => {
            expect(window.location.assign).toHaveBeenCalledTimes(1);
            expect(window.location.assign).toHaveBeenCalledWith('/content');
        });
    });

    describe('and tries to login with the wrong credentials', () => {
        const email = 'the_wrong_email';
        const password = 'the_wrong_password';
        const serverResponse = { status: 401 };
        let axios: any;
        let store: any;

        beforeAll(async () => {
            jest.resetModules();
            axios = require('axios');
            const { user } = require('../User');

            localStorage.clear();
            axios.post.mockClear();
            axios.post.mockImplementationOnce(() => Promise.reject(serverResponse));

            store = init({ models: { user } });
            (store.dispatch['user'] as Dispatch).onLoginPageChangeField({ key: 'email', value: email });
            (store.dispatch['user'] as Dispatch).onLoginPageChangeField({ key: 'password', value: password });

            await (store.dispatch['user'] as Dispatch).login();
        });

        it('sends the wrong credentials to the backend', () => {
            expect(axios.post).toHaveBeenCalledWith('/api/users/login', { email, password });
        });

        it('should report an error', () => {
            expect((store.getState().user as State).loginPage.errorMessage).toEqual('Access Denied');
        });

        it('should not have any sesstionToken stored in the localStorage', () => {
            expect(window.localStorage.getItem('sessionToken')).toBeNull();
        });
    });

});


describe('when the user is logged in', () => {
    const sessionToken = 'a_session_token';
    let store: any;

    beforeAll(() => {
        jest.resetModules();

        // store the sessionToken token before initializing the model
        localStorage.setItem('sessionToken', sessionToken);

        const { user } = require('../User');
        store = init({ models: { user } });
    });

    it('should have the sesstionToken in the state', () => {
        expect((store.getState().user as State).sessionToken).toEqual(sessionToken);
    });
});
