import * as React from 'react';

interface Props {
    label: string;
    value: string;
    pathname: string;
    onChange: { (value: string): void }
}

const ImageField = (props: Props) => {
    const tokens = props.pathname.split('/').filter(t => t.length > 0);
    tokens[0] = 'files';

    const src = ['/api', ...tokens, props.value].join('/');
    return (
        <div className={classes.field}>
            <label className={classes.label}>{props.label}</label>
            <div className={classes.imageContainer}>
                <img src={src} />
            </div>
        </div>
    );
}

const classes = {
    field: "w-full py-2",
    label: "block pb-2 text-grey-darkest font-medium",
    imageContainer: "p-2 w-full border rounded",
}

export default ImageField;
