import * as React from 'react';
import { connect } from 'react-redux';
// import * as slug from 'slugg';
import * as Modal from 'react-modal';
import { AutoSizer, List } from 'react-virtualized';

import TextField from './TextField';
import * as UiModel from '../models/Ui';
const { Icon } = require('react-fa');

interface OwnProps {
  title: string;
  isModalOpen: boolean;
  closeModal: { (): void };
}

interface Props extends OwnProps, UiModel.State {}

interface State {
  searchText: string;
}

class FilterSelectModal extends React.Component<Props, State> {
  state = {
    searchText: '',
  };

  render() {
    console.log('this.props', this.props);
    const { title, isModalOpen, closeModal } = this.props;
    const messages = this.props.messages.selectModal;

    const { searchText } = this.state;

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Search"
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', paddingTop: 100 } }}
        className={classes.modelContent}
        overlayClassName={classes.modelOverlay}
      >
        <div>
          <div className={classes.headerContainer}>
            <h3 className={classes.headerTitle}>{title}</h3>
            <button className={classes.headerCloseButton} onClick={closeModal}>
              <Icon name="times" />
            </button>
          </div>
          <div className={classes.bodyContainer}>
            <TextField label={messages.searchField} value={searchText} onChange={searchText => this.setState({ searchText })} />
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  className={classes.listContainer}
                  height={300}
                  width={width}
                  rowCount={10}
                  rowHeight={36}
                  rowRenderer={this.renderRow}
                />
              )}
            </AutoSizer>
          </div>
        </div>
      </Modal>
    );
  }

  renderRow = (
    {
      /*
    index, // Index of row
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    key, // Unique key within array of rendered rows
    parent, // Reference to the parent List (instance)
    style, // Style object to be applied to row (to position it);
    // This must be passed through to the rendered row element.
    */
    },
  ) => {
    return <div className={classes.listRow}>Whatever</div>;
  };
}

const classes = {
  modelOverlay: 'fixed pin',
  modelContent: 'rounded container max-w-md mx-auto bg-white',
  headerContainer: 'flex bg-blue-darker rounded-t',
  headerTitle: 'flex-1 text-white p-4',
  headerCloseButton: 'w-8 h-8 rounded-tr p-2 rounded-bl text-grey hover:text-white hover:bg-blue-darkest font-thin font-mono',
  bodyContainer: 'p-6 pt-2',
  listContainer: '',
  listRow: 'my-2 p-2 w-full bg-grey-lighter border rounded border-dashed cursor-pointer text-sm',
};

const mapState = (state: { ui: UiModel.State }) => ({
  messages: state.ui.messages,
});

export default connect(
  mapState,
  null,
)(FilterSelectModal as any) as any;
