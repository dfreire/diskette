import * as React from 'react';
import { connect } from 'react-redux';
import * as UserModel from '../models/User';
import * as UiModel from '../models/Ui';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';

interface Props extends UiModel.State, UserModel.State, UserModel.Dispatch {}

const Login = (props: Props) => {
  const onClickedLogin = (evt: any) => {
    evt.preventDefault();
    props.login();
  };

  const { username, password } = props.loginPage;
  const { isLogginIn } = props;
  const messages = props.messages.loginPage;
  console.log('isLogginIn', isLogginIn);

  return (
    <div className={classes.container}>
      <form>
        <TextField
          label={messages.usernameField}
          value={username}
          onChange={value => props.setValue({ key: 'username', value })}
        />
        <PasswordField
          label={messages.passwordField}
          value={password}
          onChange={value => props.setValue({ key: 'password', value })}
        />
        <div className={classes.buttonContainer}>
          <button className={classes.button} onClick={evt => !isLogginIn && onClickedLogin(evt)}>
            {isLogginIn ? <span className="loading bullet" /> : messages.loginButton}
          </button>
        </div>
      </form>
    </div>
  );
};

const classes = {
  container: 'p-4',
  buttonContainer: 'w-full py-2',
  button: 'block w-full p-3 mt-4 font-sans rounded bg-green text-white hover:bg-green-light',
};

const mapState = (models: { user: UserModel.State; ui: UiModel.State }) => ({
  messages: models.ui.messages,
  loginPage: models.user.loginPage,
  isLogginIn: models.user.isLogginIn,
});

const mapDispatch = (models: { user: UserModel.Dispatch }) =>
  ({
    setValue: models.user.setValue,
    login: models.user.login,
  } as any);

export default connect(
  mapState,
  mapDispatch,
)(Login);
