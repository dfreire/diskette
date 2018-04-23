import * as React from 'react';
import { connect } from 'react-redux';
import * as UserModel from '../models/User';

interface Props extends UserModel.State, UserModel.Dispatch {

}

const Login = (props: Props) => (
    <div>
        <h1>Login</h1>
        <button onClick={props.login}>Login</button>
    </div>
);

const mapState = (models: { user: UserModel.State }) => ({

});

const mapDispatch = (models: { user: UserModel.Dispatch }) => ({
    login: models.user.login,
}) as any;

export default connect(mapState, mapDispatch)(Login);