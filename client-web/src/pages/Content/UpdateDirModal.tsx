import * as React from 'react';
import * as Modal from 'react-modal';
const { Icon } = require('react-fa');
import * as DirsModel from '../../models/Dirs';
import TextField from '../../components/TextField';
import ModalClasses from './ModalClasses';

interface Props extends DirsModel.State, DirsModel.Dispatch {
    location: Location;
}

const UpdateDirModal = (props: Props) => {
    const { pathname } = props.location;

    return (
        <Modal
            isOpen={props.showUpdateModal}
            onRequestClose={props.closeModals}
            contentLabel="Update Dir"
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', paddingTop: 100 } }}
            className={classes.modelContent}
            overlayClassName={classes.modelOverlay}
        >
            <div>
                <div className={classes.headerContainer}>
                    <h3 className={classes.headerTitle}>Modificar</h3>
                    <button className={classes.headerCloseButton} onClick={props.closeModals}>
                        <Icon name="times" />
                    </button>
                </div>
                <div className={classes.formContainer}>
                    <TextField
                        label="Nome"
                        value={props.modalData.dirItem.friendlyName}
                        onChange={value => props.setModalFriendlyName({ friendlyName: value })}
                    />
                    <div className={classes.saveButtonContainer}>
                        <button className={classes.saveButton} onClick={() => props.update({ pathname })}>Gravar</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

const classes = ModalClasses;

export default UpdateDirModal;
