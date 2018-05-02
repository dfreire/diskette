import { init } from "@rematch/core";

const sessionToken = 'a_session_token';
localStorage.setItem('sessionToken', sessionToken);

import { user, State } from '../User';

describe('when the user is logged in', () => {
    let store: any;

    beforeAll(() => {
        store = init({ models: { user } });
    });

    it('should have the sesstionToken in the state', () => {
        expect((store.getState().user as State).sessionToken).toEqual(sessionToken);
    });
});
