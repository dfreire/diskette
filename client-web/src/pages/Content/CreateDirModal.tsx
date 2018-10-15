import * as React from 'react';
import { connect } from 'react-redux';
import * as Modal from 'react-modal';
import * as slug from 'slugg';
const { Icon } = require('react-fa');
import * as UiModel from '../../models/Ui';
import * as DirsModel from '../../models/Dirs';
import * as ContentModel from '../../models/Content';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import ModalClasses from './ModalClasses';

interface OwnProps {
  location: Location;
}

interface StateToProps {
  modalDirItem: DirsModel.DirItem;
  showCreateModal: boolean;
  subTypes: string[];
  messages: {
    title: string;
    nameField: string;
    typeField: string;
    saveButton: string;
  };
}

const mapState = (models: { dirs: DirsModel.State; content: ContentModel.State; ui: UiModel.State }): StateToProps => ({
  modalDirItem: models.dirs.modalDirItem,
  showCreateModal: models.dirs.showCreateModal,
  subTypes: models.content.contentPage.contentType.subTypes,
  messages: models.ui.messages.createDirModal,
});

interface DispatchToProps extends DirsModel.Dispatch {}

const mapDispatch = (models: { dirs: DirsModel.Dispatch }): DispatchToProps => ({
  ...models.dirs,
});

interface Props extends OwnProps, StateToProps, DispatchToProps {}

const CreateDirModal = (props: Props) => {
  const { messages, modalDirItem, location } = props;
  const { pathname } = location;
  const subTypeOptions = props.subTypes.map(subType => ({ label: subType, value: subType }));

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
            value={modalDirItem.friendlyName}
            onChange={value => props.setModalFriendlyName({ friendlyName: value })}
          />
          <SelectField
            label={messages.typeField}
            value={modalDirItem.contentType}
            options={subTypeOptions}
            onChange={value => props.setModalContentType({ contentType: value })}
          />
          <div className={classes.saveButtonContainer}>
            <button
              className={classes.saveButton}
              onClick={() => props.create({ pathname })}
              disabled={slug(modalDirItem.friendlyName).length === 0}
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

export default connect(
  mapState,
  mapDispatch as any,
)(CreateDirModal) as any;
