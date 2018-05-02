import * as React from 'react';

interface Props {
    label: string;
    value: string;
    onChange: { (value: string): void }
}

const TextAreaField = (props: Props) => (
    <div className={classNames.field}>
        <label className={classNames.label}>{props.label}</label>
        <textarea
            className={classNames.textarea}
            value={props.value}
            onChange={evt => props.onChange(evt.target.value)}
            rows={10}
        />
    </div>
);

const classNames = {
    field: "w-full py-2",
    label: "block pb-2 text-grey-darkest font-medium",
    textarea: "block p-2 w-full border rounded leading-normal",
}

export default TextAreaField;
