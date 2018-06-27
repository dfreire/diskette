import * as prompts from 'prompts';
import * as model from '../model';

async function run() {
    const { username, password } = await prompts([{
        type: 'text',
        name: 'username',
        message: 'username'
    }, {
        type: 'password',
        name: 'password',
        message: 'password'
    }]);

    await model.create(username, password);
}

run();
