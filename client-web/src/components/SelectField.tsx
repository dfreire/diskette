import * as React from 'react';

interface Props {
    label: string;
    value: string;
    valueMap: { [key: string]: string };
    onChange: { (value: string): void }
}

const SelectField = (props: Props) => (
    <div className={classes.field}>
        <label className={classes.label}>{props.label}</label>
        <select className={classes.select} value={props.value} onChange={evt => props.onChange(evt.target.value)}>
            {Object.keys(props.valueMap).map(key => (
                <option key={key} value={props.valueMap[key]}>{key}</option>
            ))}
        </select>

    </div>
);

const classes = {
    field: "w-full py-2",
    label: "block pb-2 text-grey-darkest font-medium",
    select: "block p-2 w-full border rounded",
}

export default SelectField;
