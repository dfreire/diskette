import * as React from 'react';
import { connect } from 'react-redux';
import * as slug from 'slugg';
import * as Modal from 'react-modal';
import { AutoSizer, List } from 'react-virtualized';

import TextField from './TextField';
import { SelectOption } from '../models/Types';
import * as UiModel from '../models/Ui';
const { Icon } = require('react-fa');

interface OwnProps {
  filter: string;
  title: string;
  isModalOpen: boolean;
  closeModal: { (): void };
  onSelect: { (option: SelectOption): void };
  options: SelectOption[];
}

interface Props extends OwnProps, UiModel.State {}

interface State {
  searchText: string;
}

class FilterSelectModal extends React.Component<Props, State> {
  state = {
    searchText: '',
  } as State;

  render() {
    const { title, isModalOpen, closeModal, options } = this.props;
    const { searchText } = this.state;
    const messages = this.props.messages.selectModal;

    const _searchText = slug(searchText);
    const listRows = options.filter(option => slug(option.label).indexOf(_searchText) >= 0);

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
            <TextField
              label={messages.searchField}
              value={searchText}
              onChange={searchText => this.setState({ searchText })}
            />
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  className={classes.listContainer}
                  height={300}
                  width={width}
                  rowCount={listRows.length}
                  rowHeight={36}
                  rowRenderer={listRowProps => this.renderListRow(listRows, listRowProps)}
                />
              )}
            </AutoSizer>
          </div>
        </div>
      </Modal>
    );
  }

  renderListRow(
    listRows: SelectOption[],
    listRowProps: {
      key: string;
      index: number;
      isScrolling: boolean;
      isVisible: boolean;
      style: object;
    },
  ) {
    const { onSelect } = this.props;
    const { key, index, style } = listRowProps;
    const option = listRows[index];
    return (
      <div key={key} className={classes.listRow} style={style} onClick={() => onSelect(option)}>
        {option.label}
      </div>
    );
  }
}

const classes = {
  modelOverlay: 'fixed pin',
  modelContent: 'rounded container max-w-md mx-auto bg-white',
  headerContainer: 'flex bg-blue-darker rounded-t',
  headerTitle: 'flex-1 text-white p-4',
  headerCloseButton:
    'w-8 h-8 rounded-tr p-2 rounded-bl text-grey hover:text-white hover:bg-blue-darkest font-thin font-mono',
  bodyContainer: 'p-6 pt-2',
  listContainer: 'mt-2 rounded',
  listRow: 'p-2 w-full border border-dashed cursor-pointer bg-grey-lightest hover:bg-green-lightest',
};

const mapState = (state: { ui: UiModel.State }) => ({
  messages: state.ui.messages,
});

export default connect(
  mapState,
  null,
)(FilterSelectModal as any) as any;
