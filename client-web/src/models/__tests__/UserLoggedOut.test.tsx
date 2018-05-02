const axios = require('axios'); // will find mock at 'src/__mocks__'
import { dispatch } from "@rematch/core";
import { user } from '../User';

const INITIAL_STATE = { ...user.state };

describe('when the user is logged out and tries to login', () => {
    
    describe('using the right credentials', () => {
        const email = 'the_right_email';
        const password = 'the_right_password';
        const sessionToken = 'a_session_token';
        const serverResponse = { status: 200, data: sessionToken };

        beforeAll(async () => {
            // prepare the mocks
            axios.post.mockClear();
            axios.post.mockImplementationOnce(() => Promise.resolve(serverResponse));
            window.location.assign = jest.fn();

            // prepare the state
            user.state = INITIAL_STATE;
            user.state.loginPage.email = email;
            user.state.loginPage.password = password;
            const rootState = { user: user.state };

            // execute
            await user.effects.login({}, rootState);
        });

        it('sends the right credentials to the backend', () => {
            expect(axios.post).toHaveBeenCalledTimes(1);
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

    describe('using the wrong credentials', () => {
        const email = 'the_wrong_email';
        const password = 'the_wrong_password';

        beforeAll(async () => {
            // prepare the mocks
            axios.post.mockClear();
            axios.post = jest.fn();
            axios.post.mockImplementationOnce(() => Promise.reject({}));
            (dispatch as any).user = { onLoginError: jest.fn() };

            // prepare the state
            user.state = INITIAL_STATE;
            user.state.loginPage.email = email;
            user.state.loginPage.password = password;
            const rootState = { user: user.state };

            // execute
            await user.effects.login({}, rootState);
        });

        it('sends the wrong credentials to the backend', () => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith('/api/users/login', { email, password });
        });

        it('should report an error', () => {
            expect((dispatch as any).user.onLoginError).toHaveBeenCalledTimes(1);
        });
    });
});