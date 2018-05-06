import * as React from 'react';
const { Icon } = require('react-fa');
import axios from 'axios';

interface Props {
    label: string;
    value: string;
    pathname: string;
    onChange: { (value: string): void }
}

const ImageField = (props: Props) => {
    let fileInput: HTMLInputElement | null;

    const onClickedUpload = () => {
        console.log('onClickedUpload', fileInput);
        fileInput != null && fileInput.click();
    };

    const upload = async (evt: any) => {
        const files = evt.target.files;

        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('files', files.item(i));
        }

        const res = await axios.post('/api/files', data);
        console.log('res', res);
    }

    const tokens = props.pathname.split('/').filter(t => t.length > 0).slice(1);
    const src = ['/api/files', ...tokens, props.value].join('/');

    return (
        <div className={classes.field}>
            <label className={classes.label}>{props.label}</label>
            <div className={classes.imageContainer}>
                <img src={src} />
                <div className={classes.buttonsContainer}>
                    <button className={classes.button} onClick={onClickedUpload}><Icon name="upload" /></button>
                    <button className={classes.button}><Icon name="trash" /></button>
                    <input ref={(ref) => { fileInput = ref; }} className="hidden" type="file" onChange={upload} />
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
