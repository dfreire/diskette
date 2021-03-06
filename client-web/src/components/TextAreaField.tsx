import * as React from 'react';

interface Props {
  label: string;
  rows: number;
  value: string;
  onChange: { (value: string): void };
}

const TextAreaField = (props: Props) => (
  <div className={classes.field}>
    <label className={classes.label}>{props.label}</label>
    <textarea className={classes.textarea} value={props.value} onChange={evt => props.onChange(evt.target.value)} rows={props.rows || 10} />
  </div>
);

const classes = {
  field: 'w-full py-2',
  label: 'block pb-2 text-grey-darkest font-medium',
  textarea: 'block p-2 w-full border rounded leading-normal',
};

export default TextAreaField;
