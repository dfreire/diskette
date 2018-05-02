import * as path from 'path';
import * as fs from 'fs-extra';
import * as prompts from 'prompts';
import * as model from '../model';

async function run() {
    const { currentEmail, newEmail } = await prompts([{
        type: 'text',
        name: 'currentEmail',
        message: 'old email'
    }, {
        type: 'text',
        name: 'newEmail',
        message: 'new email'
    }]);

    await model.setEmail(currentEmail, newEmail);
}

run();
