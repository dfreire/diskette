import * as React from 'react';
import { connect } from 'react-redux';
import * as UserModel from '../models/User';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';

interface Props extends UserModel.State, UserModel.Dispatch {
}

const Login = (props: Props) => {
    const onClickedLogin = (evt: any) => {
        evt.preventDefault();
        props.login();
    }

    return (
        <div className={classes.container}>
            <form>
                <EmailField
                    label="Email"
                    value={props.loginPage.email}
                    onChange={value => props.setValue({ key: 'email', value })}
                />
                <PasswordField
                    label="Password"
                    value={props.loginPage.password}
                    onChange={value => props.setValue({ key: 'password', value })}
                />
                <div className={classes.buttonContainer}>
                    <button className={classes.button} onClick={onClickedLogin}>Login</button>
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

const mapState = (models: { user: UserModel.State }) => ({
    loginPage: models.user.loginPage,
});

const mapDispatch = (models: { user: UserModel.Dispatch }) => ({
    setValue: models.user.setValue,
    login: models.user.login
}) as any;

export default connect(mapState, mapDispatch)(Login);
