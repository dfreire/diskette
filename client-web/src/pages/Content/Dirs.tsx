import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as DirsModel from '../../models/Dirs';
import CreateDirModal from './CreateDirModal';
import UpdateDirModal from './UpdateDirModal';
const { Icon } = require('react-fa');

interface Props extends DirsModel.State, DirsModel.Dispatch {
    location: Location;
}

class Dirs extends React.Component<Props, {}>{
    render() {
        const { location, dirItems, openCreateModal, openUpdateModal } = this.props;
        const { pathname } = location;

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
                <ul className={classes.dirList}>
                    {dirItems.map((dirItem, i) => {
                        const to = [pathname, dirItem.name].join('/');

                        return (
                            <li key={dirItem.name} className={classes.dirItem}>
                                <Link to={to} className={classes.dirItemLink}>{dirItem.friendlyName}</Link>
                                <span className={classes.dirItemButtons}>
                                    <button className={classes.dirItemButton} onClick={() => openUpdateModal({ dirItem })}>
                                        <Icon name="cog" />
                                    </button>
                                    <button className={classes.dirItemButton}>
                                        <Icon name="trash" />
                                    </button>
                                </span>
                            </li>
                        );
                    })}
                </ul>

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

    addButtonContainer: 'p-2 md:px-3',
    addButton: 'w-full bg-green hover:bg-green-light text-white p-3 rounded',

    dirList: 'list-reset',
    dirItem: 'group flex md:pl-1 hover:bg-grey-lighter',

    dirItemLink: 'flex-1 p-3 text-grey-darker hover:text-black no-underline truncate',
    dirItemButtons: 'invisible group-hover:visible p-3',
    dirItemButton: 'px-1 text-grey hover:text-black',
};

const mapState = (models: { dirs: DirsModel.State }) => ({
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
}) as any;

export default connect(mapState, mapDispatch)(Dirs) as any;