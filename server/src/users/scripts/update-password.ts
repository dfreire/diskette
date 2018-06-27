import * as prompts from 'prompts';
import * as model from '../model';

async function run() {
    const { currentUsername, newPassword } = await prompts([{
        type: 'text',
        name: 'currentUsername',
        message: 'current username'
    }, {
        type: 'password',
        name: 'password',
        message: 'new password'
    }]);

    await model.setPassword(currentUsername, newPassword);
}

run();
