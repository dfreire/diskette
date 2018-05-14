import * as React from 'react';
import { connect } from 'react-redux';
import * as UserModel from '../models/User';
import * as UiModel from '../models/Ui';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';

interface Props extends UiModel.State, UserModel.State, UserModel.Dispatch {
}

const Login = (props: Props) => {
    const onClickedLogin = (evt: any) => {
        evt.preventDefault();
        props.login();
    }

    const messages = props.messages.loginPage;

    return (
        <div className={classes.container}>
            <form>
                <EmailField
                    label={messages.emailField}
                    value={props.loginPage.email}
                    onChange={value => props.setValue({ key: 'email', value })}
                />
                <PasswordField
                    label={messages.passwordField}
                    value={props.loginPage.password}
                    onChange={value => props.setValue({ key: 'password', value })}
                />
                <div className={classes.buttonContainer}>
                    <button className={classes.button} onClick={onClickedLogin}>{messages.loginButton}</button>
                </div>
            </form>
        </div>
    );
}

const classes = {
    container: 'p-4',
    buttonContainer: "w-full py-2",
    button: "block w-full p-3 mt-4 font-sans rounded bg-green text-white hover:bg-green-light"
}

const mapState = (models: { user: UserModel.State, ui: UiModel.State }) => ({
    messages: models.ui.messages,
    loginPage: models.user.loginPage,
});

const mapDispatch = (models: { user: UserModel.Dispatch }) => ({
    setValue: models.user.setValue,
    login: models.user.login
}) as any;

export default connect(mapState, mapDispatch)(Login);
