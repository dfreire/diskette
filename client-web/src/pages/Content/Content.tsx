import * as React from 'react';
import { connect } from 'react-redux';
import * as ContentModel from '../../models/Content';
import Form from './Form';
import Dirs from './Dirs';

interface Props extends ContentModel.State, ContentModel.Dispatch {
    location: Location;
}

interface State { };

class Content extends React.Component<Props, State> {
    render() {
        const hasType = this.props.contentPage.content.type.length > 0;

        return hasType && (
            <div className={classes.container}>
                <div className={classes.formContainer}>
                    <Form {...this.props} />
                </div>
                <div className={classes.subDirsContainer}>
                    <Dirs {...this.props} />
                </div>
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
    container: 'flex flex-col md:flex-row',
    formContainer: 'w-full md:w-2/3 p-4',
    subDirsContainer: 'w-full md:w-1/3 p-4 bg-grey-lightest',
};

const mapState = (models: { content: ContentModel.State }) => ({
    contentPage: models.content.contentPage,
});

const mapDispatch = (models: { content: ContentModel.Dispatch }) => ({
    clear: models.content.clear,
    load: models.content.load,
}) as any;

export default connect(mapState, mapDispatch)(Content);
