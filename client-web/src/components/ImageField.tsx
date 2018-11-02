import { first, last, size } from 'lodash';
import * as React from 'react';
import { isLink } from './util';
const { Icon } = require('react-fa');

interface Props {
  label: string;
  value: string;
  onUpload: { (fileList: FileList): void };
  onRemove: { (): void };
}

const ImageField = (props: Props) => {
  let fileInput: HTMLInputElement | null;

  const onUpload = () => {
    fileInput != null && fileInput.click();
  };

  const { value } = props;
  const href = first(value.split('?'));
  const filename = last((href || '').split('/'));

  return (
    <div className={classes.field}>
      <label className={classes.label}>{props.label}</label>
      <div className={classes.imageContainer}>
        <img src={props.value} />
        {size(filename) > 0 && (
          <div>
            <input className={classes.filename} type="text" value={filename} disabled />
          </div>
        )}
        <div className={classes.buttonsContainer}>
          {isLink(href) && (
            <a className={classes.button} href={href} target="_blank">
              <Icon name="external-link-square" />
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
  imageContainer: 'p-2 w-full border rounded relative',
  buttonsContainer: 'absolute pin-t pin-r bg-white p-1 rounded-bl',
  button: 'p-1 text-grey hover:text-black',
  filename: 'w-full text-grey text-sm',
};

export default ImageField;
