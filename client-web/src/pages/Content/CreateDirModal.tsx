import * as React from 'react';
import * as Modal from 'react-modal';
import TextField from '../../components/TextField';

interface Props {
    isOpen: boolean;
    onClose: { (): void };
    name: string;
    type: string;
    setValue: { (payload: { key: string; value: any }): void };
}

const CreateDirModal = (props: Props) => {
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
                    label="Tipo"
                    value={props.type}
                    onChange={(value) => props.setValue({ key: 'type', value })}
                />
            </div>
        </Modal>
    );
}

const classes = {
    modelOverlay: "fixed pin",
    modelContent: 'container max-w-xs mx-auto bg-white p-4',
    container: '',
};

export default CreateDirModal;
