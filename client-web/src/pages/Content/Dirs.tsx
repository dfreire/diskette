import * as React from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as UiModel from '../../models/Ui';
import * as DirsModel from '../../models/Dirs';
import CreateDirModal from './CreateDirModal';
import UpdateDirModal from './UpdateDirModal';
const { Icon } = require('react-fa');

interface Props extends UiModel.State, DirsModel.State, DirsModel.Dispatch {
    location: Location;
}

interface State {
    deletingItemName: string;
}

class Dirs extends React.Component<Props, State>{
    state = {
        deletingItemName: '',
    };

    render() {
        const { location, dirItems, openCreateModal, openUpdateModal, remove } = this.props;
        const { deletingItemName } = this.state;
        const { pathname } = location;

        const onDragEnd = (result: DropResult) => {
            if (result.source != null && result.destination != null) {
                const oldPos = result.source.index;
                const oldName = `${oldPos}-${result.draggableId}`;
                const newPos = result.destination.index;
                const payload = { pathname, oldName, oldPos, newPos };
                this.props.reorder(payload);
            }
        }

        return (
            <div className={classes.container}>
                <div className={classes.addButtonContainer}>
                    <button
                        className={classes.addButton}
                        onClick={openCreateModal}
                    >
                        <Icon name="plus" />
                    </button>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <ul ref={provided.innerRef} className={classes.dirList}>
                                {dirItems.map((dirItem, i) => {
                                    const to = [pathname, dirItem.name].join('/');

                                    return (
                                        <Draggable key={dirItem.friendlyName} draggableId={dirItem.friendlyName} index={i}>
                                            {(provided, snapshot) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps as any} {...provided.dragHandleProps as any} className={classes.dirItem} onMouseLeave={() => this.setState({ deletingItemName: '' })}>
                                                    <Link to={to} className={classes.dirItemLink}>{dirItem.friendlyName}</Link>
                                                    <span className={classes.dirItemButtons}>
                                                        {deletingItemName !== dirItem.name &&
                                                            <button className={classes.dirItemButton} onClick={() => openUpdateModal({ dirItem })}>
                                                                <Icon name="cog" />
                                                            </button>
                                                        }
                                                        {deletingItemName !== dirItem.name &&
                                                            <button className={classes.dirItemButton} onClick={() => this.setState({ deletingItemName: dirItem.name })}>
                                                                <Icon name="trash" />
                                                            </button>
                                                        }
                                                        {deletingItemName === dirItem.name &&
                                                            <button className={classes.dirItemButton} onClick={() => remove({ pathname, dirItem })}>
                                                                <Icon name="check" />
                                                            </button>
                                                        }
                                                        {deletingItemName === dirItem.name &&
                                                            <button className={classes.dirItemButton} onClick={() => this.setState({ deletingItemName: '' })}>
                                                                <Icon name="ban" />
                                                            </button>
                                                        }
                                                    </span>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>

                <CreateDirModal {...this.props} />
                <UpdateDirModal {...this.props} />
            </div>
        );
    }

    componentWillMount() {
        this._load(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            this._load(nextProps.location.pathname);
        }
    }

    _load(pathname: string) {
        this.props.clear();
        this.props.load({ pathname });
    }
}

const classes = {
    container: 'text-sm',

    addButtonContainer: 'p-4 md:px-3 bg-grey-lightest _border-b',
    addButton: 'w-full bg-green hover:bg-green-light text-white p-3 rounded',

    dirList: 'list-reset',
    dirItem: 'group flex md:pl-1 hover:bg-grey-lighter',

    dirItemLink: 'flex-1 p-3 text-grey-darker hover:text-black no-underline truncate',
    dirItemButtons: 'invisible group-hover:visible p-3',
    dirItemButton: 'px-1 text-grey hover:text-black',
};

const mapState = (models: { dirs: DirsModel.State, ui: UiModel.State }) => ({
    messages: models.ui.messages,
    dirItems: models.dirs.dirItems,
    contentTypes: models.dirs.contentTypes,
    modalData: models.dirs.modalData,
    showCreateModal: models.dirs.showCreateModal,
    showUpdateModal: models.dirs.showUpdateModal,
});

const mapDispatch = (models: { dirs: DirsModel.Dispatch }) => ({
    clear: models.dirs.clear,
    load: models.dirs.load,
    openCreateModal: models.dirs.openCreateModal,
    openUpdateModal: models.dirs.openUpdateModal,
    closeModals: models.dirs.closeModals,
    setModalFriendlyName: models.dirs.setModalFriendlyName,
    setModalContentType: models.dirs.setModalContentType,
    create: models.dirs.create,
    update: models.dirs.update,
    reorder: models.dirs.reorder,
    remove: models.dirs.remove,
}) as any;

export default connect(mapState, mapDispatch)(Dirs) as any;