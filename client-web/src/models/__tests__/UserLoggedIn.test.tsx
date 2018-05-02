const sessionToken = 'a_session_token';
localStorage.setItem('sessionToken', sessionToken);
import { user } from '../User';

describe('when the user is logged in', () => {
    it('should have the sesstionToken in the state', () => {
        expect(user.state.sessionToken).toEqual(sessionToken);
    });
});