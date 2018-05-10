import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ContentModel from '../../models/Content';
import SubDirModal from './SubDirModal';
const { Icon } = require('react-fa');

interface Props extends ContentModel.State, ContentModel.Dispatch {
    location: Location;
}

interface State {
    showCreateModal: boolean;
    showUpdateModal: boolean;
}

class SubDirs extends React.Component<Props, State>{
    state = {
        showCreateModal: false,
        showUpdateModal: false,
    };

    render() {
        const { location, contentPage, dirModal, setDirValue, onClickedCreateDir, onClickedUpdateDir } = this.props;
        const { showCreateModal, showUpdateModal } = this.state;
        const { pathname } = location;

        return (
            <div className={classes.container}>
                <div className={classes.addButtonContainer}>
                    <button
                        className={classes.addButton}
                        onClick={(evt) => this.setState({ showCreateModal: true })}
                    >
                        <Icon name="plus" />
                    </button>
                </div>
                <ul className={classes.dirList}>
                    {contentPage.content.subDirs.map((name, i) => {
                        const to = [pathname, name].join('/');

                        return (
                            <li key={name} className={classes.dirItem}>
                                <Link to={to} className={classes.dirItemLink} title={name}>{name}</Link>
                                <span className={classes.dirItemButtons}>
                                    <button
                                        className={classes.dirItemButton}
                                        onClick={(evt) => this.setState({ showUpdateModal: true })}
                                    >
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

                <SubDirModal
                    isNewDir={true}
                    isOpen={showCreateModal}
                    onClose={() => this.setState({ showCreateModal: false })}
                    name={dirModal.name}
                    type={dirModal.type}
                    setValue={setDirValue}
                    onClickedSave={() => onClickedCreateDir({ pathname })}
                />
                <SubDirModal
                    isNewDir={false}
                    isOpen={showUpdateModal}
                    onClose={() => this.setState({ showUpdateModal: false })}
                    name={dirModal.name}
                    type={dirModal.type}
                    setValue={setDirValue}
                    onClickedSave={() => onClickedUpdateDir({ pathname })}
                />
            </div>
        );
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

const mapState = (models: { content: ContentModel.State }) => ({
    contentPage: models.content.contentPage,
    dirModal: models.content.dirModal,
});

const mapDispatch = (models: { content: ContentModel.Dispatch }) => ({
    setDirValue: models.content.setDirValue,
    onClickedCreateDir: models.content.onClickedCreateDir,
    onClickedUpdateDir: models.content.onClickedUpdateDir,
}) as any;

export default connect(mapState, mapDispatch)(SubDirs);