import * as React from 'react';
import * as Modal from 'react-modal';
import TextField from '../../components/TextField';

interface Props {
    isNewDir: boolean;
    isOpen: boolean;
    onClose: { (): void };
    name: string;
    type: string;
    setValue: { (payload: { key: string; value: any }): void };
    onClickedSave: { (): void };
}

const SubDirModal = (props: Props) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            contentLabel="Create Dir"
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', paddingTop: 100 } }}
            className={classes.modelContent}
            overlayClassName={classes.modelOverlay}
        >
            <div className={classes.container}>
                <TextField
                    label="Name"
                    value={props.name}
                    onChange={(value) => props.setValue({ key: 'name', value })}
                />
                <TextField
                    label="Type"
                    value={props.type}
                    onChange={(value) => props.setValue({ key: 'type', value })}
                />
                <div className={classes.buttonContainer}>
                    <button className={classes.button} onClick={props.onClickedSave}>Save</button>
                </div>
            </div>
        </Modal>
    );
}

const classes = {
    modelOverlay: 'fixed pin',
    modelContent: 'container max-w-xs mx-auto bg-white',
    container: 'p-8',
    buttonContainer: 'w-full py-2',
    button: 'block w-full p-3 mt-4 font-sans rounded bg-green text-white hover:bg-green-light',
};

export default SubDirModal;
