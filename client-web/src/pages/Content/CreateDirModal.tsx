import * as React from 'react';
import * as Modal from 'react-modal';

interface Props {
    isOpen: boolean;
    onClose: { (): void };
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
                <h1>Create</h1>
            </div>
        </Modal>
    );
}

const classes = {
    modelOverlay: "fixed pin",
    modelContent: 'bg-yellow w-64 mx-auto',
    container: '',
};

export default CreateDirModal;
