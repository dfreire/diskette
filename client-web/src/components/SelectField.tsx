import * as React from 'react';
const { Icon } = require('react-fa');

interface Props {
    label: string;
    value: string;
    valueMap: { [key: string]: string };
    onChange: { (value: string): void }
}

const SelectField = (props: Props) => (
    <div className={classes.field}>
        <label className={classes.label}>{props.label}</label>
        <div className={classes.selectContainer}>
            <select className={classes.select} value={props.value} onChange={evt => props.onChange(evt.target.value)}>
                {Object.keys(props.valueMap).map(key => (
                    <option key={key} value={props.valueMap[key]}>{key}</option>
                ))}
            </select>
            <div className={classes.dropdownIcon}>
                <Icon name="caret-down" />
            </div>
        </div>
    </div>
);

const classes = {
    field: 'w-full py-2',
    label: 'block pb-2 text-grey-darkest font-medium',
    selectContainer: 'relative block w-full border rounded bg-grey-lighter hover:bg-grey-lightest',
    select: 'appearance-none inline-block w-full absolute pin p-2 bg-transparent',
    dropdownIcon: 'inline-block w-full text-right p-2 bg-transparent',
}

export default SelectField;
