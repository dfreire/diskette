import * as prompts from 'prompts';
import * as model from '../model';

async function run() {
    const { currentUsername, newUsername } = await prompts([{
        type: 'text',
        name: 'currentUsername',
        message: 'old username'
    }, {
        type: 'text',
        name: 'newUsername',
        message: 'new username'
    }]);

    await model.setUsername(currentUsername, newUsername);
}

run();
