import * as React from 'react';
const { Icon } = require('react-fa');

interface Props {
    label: string;
    value: string;
    pathname: string;
    onUpload: { (fileList: FileList): void }
}

const ImageField = (props: Props) => {
    let fileInput: HTMLInputElement | null;

    const onClickedUpload = () => {
        fileInput != null && fileInput.click();
    };

    const src = [
        '/api/files',
        ...props.pathname.split('/').filter(t => t.length > 0).slice(1),
        props.value,
    ].join('/');

    return (
        <div className={classes.field}>
            <label className={classes.label}>{props.label}</label>
            <div className={classes.imageContainer}>
                <img src={src} />
                <div className={classes.buttonsContainer}>
                    <button className={classes.button} onClick={onClickedUpload}><Icon name="upload" /></button>
                    <button className={classes.button}><Icon name="trash" /></button>
                    <input
                        type="file"
                        className="hidden"
                        ref={(ref) => { fileInput = ref }}
                        onChange={(evt) => evt.target.files != null && props.onUpload(evt.target.files)}
                    />
                </div>
            </div>
        </div>
    );
}

const classes = {
    field: "w-full py-2",
    label: "block pb-2 text-grey-darkest font-medium",
    imageContainer: "p-2 w-full border rounded relative",
    buttonsContainer: "absolute pin-t pin-r bg-white p-1 rounded-bl",
    button: "p-1 text-grey hover:text-black",
}

export default ImageField;
