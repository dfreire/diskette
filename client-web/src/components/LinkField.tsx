import * as React from 'react';
import * as validator from 'validator';
const { Icon } = require('react-fa');

interface Props {
    label: string;
    value: string;
    onChange: { (value: string): void }
}

const LinkField = (props: Props) => (
    <div className={classes.field}>
        <label className={classes.label}>{props.label}</label>
        <div className={classes.inputContainer}>
            <input className={classes.input} type="text" value={props.value} onChange={evt => props.onChange(evt.target.value)} />
            {isLink(props.value) &&
                <a className={classes.linkIcon} href={props.value}><Icon name="external-link" /></a>
            }
        </div>
    </div>
);

const classes = {
    field: "w-full py-2",
    label: "block pb-2 text-grey-darkest font-medium",
    inputContainer: "block w-full border rounded flex",
    input: 'inline-block w-full bg-transparent flex-1 p-2',
    linkIcon: 'inline-block text-right bg-grey-lightest border-l p-2 text-black no-underline',
}

function isLink(s: string) {
    return validator.isURL(s)
        || s.startsWith('http://localhost')
        || s.startsWith('https://localhost');
}

export default LinkField;
