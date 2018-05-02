import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ContentModel from '../../models/Content';
const { Icon } = require('react-fa');

interface Props extends ContentModel.State, ContentModel.Dispatch {
    location: Location;
}

const SubDirs = (props: Props) => {
    return (
        <div className={classes.container}>
            <div className={classes.addButtonContainer}>
                <button className={classes.addButton}>
                    <Icon name="plus" />
                </button>
            </div>
            <ul className={classes.dirList}>
                {props.contentPage.content.subDirs.map((name, i) => (
                    <SubDir key={name} location={props.location} name={name} />
                ))}
            </ul>
        </div>
    );
}

const SubDir = (props: { location: Location; name: string; }) => {
    const to = [props.location.pathname, props.name].join('/');

    return (
        <li className={classes.dirItem}>
            <Link to={to} className={classes.dirItemLink} title={props.name}>{props.name}</Link>
            <span className={classes.dirItemButtons}>
                <button className={classes.dirItemButton}><Icon name="cog" /></button>
                <button className={classes.dirItemButton}><Icon name="trash" /></button>
            </span>
        </li>
    );
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
});

const mapDispatch = (models: { content: ContentModel.Dispatch }) => ({
}) as any;

export default connect(mapState, mapDispatch)(SubDirs);