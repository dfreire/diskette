import * as path from 'path';
import * as fs from 'fs-extra';
import * as prompts from 'prompts';
import * as model from '../model';

async function run() {
    const { email, password } = await prompts([{
        type: 'text',
        name: 'email',
        message: 'email'
    }, {
        type: 'password',
        name: 'password',
        message: 'password'
    }]);

    await model.create(email, password);
}

run();
