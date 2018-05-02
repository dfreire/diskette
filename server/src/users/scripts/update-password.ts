import * as path from 'path';
import * as fs from 'fs-extra';
import * as prompts from 'prompts';
import * as model from '../model';

async function run() {
    const { currentEmail, newPassword } = await prompts([{
        type: 'text',
        name: 'currentEmail',
        message: 'current email'
    }, {
        type: 'password',
        name: 'password',
        message: 'new password'
    }]);

    await model.setPassword(currentEmail, newPassword);
}

run();
