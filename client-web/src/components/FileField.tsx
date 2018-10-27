import { last } from 'lodash';
import * as React from 'react';
import { isLink } from './util';
const { Icon } = require('react-fa');

interface Props {
  label: string;
  value: string;
  onUpload: { (fileList: FileList): void };
  onRemove: { (): void };
}

const FileField = (props: Props) => {
  let fileInput: HTMLInputElement | null;

  const onUpload = () => {
    fileInput != null && fileInput.click();
  };

  const { label, value } = props;
  const filename = last((value || '').split('/'));

  console.log('process.env', process.env);

  return (
    <div className={classes.field}>
      <label className={classes.label}>{label}</label>
      <div className={classes.inputContainer}>
        <input className={classes.input} type="text" value={filename} disabled />
        <div className={classes.buttonsContainer}>
          {isLink(props.value) && (
            <a className={classes.button} href={value}>
              <Icon name="external-link" />
            </a>
          )}
          <button className={classes.button} onClick={onUpload}>
            <Icon name="upload" />
          </button>
          <button className={classes.button} onClick={props.onRemove}>
            <Icon name="trash" />
          </button>
          <input
            ref={element => {
              fileInput = element;
            }}
            type="file"
            className="hidden"
            onChange={evt => evt.target.files != null && props.onUpload(evt.target.files)}
          />
        </div>
      </div>
    </div>
  );
};

const classes = {
  field: 'w-full py-2',
  label: 'block pb-2 text-grey-darkest font-medium',
  inputContainer: 'w-full border rounded relative',
  input: 'inline-block w-full bg-grey-lightest flex-1 p-2',
  buttonsContainer: 'absolute pin-t pin-r bg-grey-lightest p-1 rounded-bl',
  button: 'p-1 text-grey hover:text-black',
};

export default FileField;
