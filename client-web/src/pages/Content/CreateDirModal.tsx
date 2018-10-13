import * as React from 'react';
import * as Modal from 'react-modal';
import * as slug from 'slugg';
const { Icon } = require('react-fa');
import * as UiModel from '../../models/Ui';
import * as DirsModel from '../../models/Dirs';
import * as ContentModel from '../../models/Content';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import ModalClasses from './ModalClasses';

interface Props extends DirsModel.State, DirsModel.Dispatch, ContentModel.State, UiModel.State {
  location: Location;
}

const CreateDirModal = (props: Props) => {
  const { pathname } = props.location;
  const messages = props.messages.createDirModal;
  const subTypes = props.contentPage.contentType.subTypes.map(subType => ({ label: subType, value: subType }));

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
          <h3 className={classes.headerTitle}>{messages.title}</h3>
          <button className={classes.headerCloseButton} onClick={props.closeModals}>
            <Icon name="times" />
          </button>
        </div>
        <div className={classes.formContainer}>
          <TextField
            label={messages.nameField}
            value={props.modalData.dirItem.friendlyName}
            onChange={value => props.setModalFriendlyName({ friendlyName: value })}
          />
          <SelectField
            label={messages.typeField}
            value={props.modalData.contentType}
            options={subTypes}
            onChange={value => props.setModalContentType({ contentType: value })}
          />
          <div className={classes.saveButtonContainer}>
            <button
              className={classes.saveButton}
              onClick={() => props.create({ pathname })}
              disabled={slug(props.modalData.dirItem.friendlyName).length === 0}
            >
              {messages.saveButton}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const classes = ModalClasses;

export default CreateDirModal;
