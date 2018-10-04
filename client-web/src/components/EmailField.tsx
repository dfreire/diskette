import * as React from 'react';

interface Props {
  label: string;
  value: string;
  onChange: { (value: string): void };
}

const EmailField = (props: Props) => (
  <div className={classes.field}>
    <label className={classes.label}>{props.label}</label>
    <input className={classes.input} type="email" value={props.value} onChange={evt => props.onChange(evt.target.value)} />
  </div>
);

const classes = {
  field: 'w-full py-2',
  label: 'block pb-2 text-grey-darkest font-medium',
  input: 'block p-2 w-full border rounded',
};

export default EmailField;
