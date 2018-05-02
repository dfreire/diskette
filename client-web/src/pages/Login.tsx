import * as React from 'react';
import { connect } from 'react-redux';
import * as UserModel from '../models/User';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';

interface Props extends UserModel.State, UserModel.Dispatch {
}

const Login = (props: Props) => (
    <div className="p-4">
        <form>
            <EmailField
                label="Email"
                value={props.loginPage.email}
                onChange={value => props.onLoginPageChangeField({ key: 'email', value })}
            />
            <PasswordField
                label="Password"
                value={props.loginPage.password}
                onChange={value => props.onLoginPageChangeField({ key: 'password', value })}
            />
            <div className={classNames.group}>
                <button className={classNames.button} onClick={(evt) => { evt.preventDefault(); props.login(); }}>Login</button>
            </div>
        </form>
    </div>
);

const classNames = {
    group: "w-full py-2",
    label: "block pb-2 text-grey-darkest font-medium",
    input: "block p-2 w-full border rounded",
    button: "block w-full p-3 mt-4 font-sans rounded bg-green text-white hover:bg-green-light hover:text-white "
}

const mapState = (models: { user: UserModel.State }) => ({
    loginPage: models.user.loginPage,
});

const mapDispatch = (models: { user: UserModel.Dispatch }) => ({
    onLoginPageChangeField: models.user.onLoginPageChangeField,
    login: models.user.login
}) as any;

export default connect(mapState, mapDispatch)(Login);
