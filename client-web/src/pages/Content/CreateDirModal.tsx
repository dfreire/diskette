import * as React from 'react';
import * as Modal from 'react-modal';
const { Icon } = require('react-fa');
import * as DirsModel from '../../models/Dirs';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import ModalClasses from './ModalClasses';

interface Props extends DirsModel.State, DirsModel.Dispatch {
    location: Location;
}

const CreateDirModal = (props: Props) => {
    const { pathname } = props.location;

    const typesMap = {};
    props.contentTypes.forEach(t => typesMap[t] = t);

    return (
        <Modal
            isOpen={props.showCreateModal}
            onRequestClose={props.closeModals}
            contentLabel="Create Dir"
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', paddingTop: 100 } }}
            className={classes.modelContent}
            overlayClassName={classes.modelOverlay}
        >
            <div>
                <div className={classes.headerContainer}>
                    <h3 className={classes.headerTitle}>Adicionar</h3>
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
                    <SelectField
                        label="Tipo"
                        value={props.modalData.contentType}
                        valueMap={typesMap}
                        onChange={value => props.setModalContentType({ contentType: value })}
                    />
                    <div className={classes.saveButtonContainer}>
                        <button className={classes.saveButton} onClick={() => props.create({ pathname })}>Gravar</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

const classes = ModalClasses;

export default CreateDirModal;
