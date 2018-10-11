import * as React from 'react';
import * as Modal from 'react-modal';
import * as slug from 'slugg';
const { Icon } = require('react-fa');

interface Props {
  title: string;
  isModalOpen: boolean;
  closeModal: { (): void };
}

const FilterSelectModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={props.closeModal}
      contentLabel="Search"
      style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', paddingTop: 100 } }}
      className={classes.modelContent}
      overlayClassName={classes.modelOverlay}
    >
      <div>
        <div className={classes.headerContainer}>
          <h3 className={classes.headerTitle}>{props.title}</h3>
          <button className={classes.headerCloseButton} onClick={props.closeModal}>
            <Icon name="times" />
          </button>
        </div>
        <div className={classes.formContainer} />
      </div>
    </Modal>
  );
};

const classes = {
  modelOverlay: 'fixed pin',
  modelContent: 'rounded container max-w-md mx-auto bg-white',
  headerContainer: 'flex bg-blue-darker rounded-t',
  headerTitle: 'flex-1 text-white p-4',
  headerCloseButton: 'w-8 h-8 rounded-tr p-2 rounded-bl text-grey hover:text-white hover:bg-blue-darkest font-thin font-mono',
  formContainer: 'p-6',
  saveButtonContainer: 'w-full py-2',
  saveButton: 'block w-full p-3 mt-4 font-sans rounded bg-green text-white hover:bg-green-light',
};

export default FilterSelectModal;
