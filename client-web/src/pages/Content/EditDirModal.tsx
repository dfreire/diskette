import * as React from 'react';
import * as Modal from 'react-modal';

interface Props {
    isOpen: boolean;
    onClose: { (): void };
}

const EditDirModal = (props: Props) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            contentLabel="Create Dir"
            className={classes.container}
        >
            <div>
                <h1>Create</h1>
            </div>
        </Modal>


    );
}

const classes = {
    container: 'w-64 h-64 bg-yellow',
};

export default EditDirModal;
