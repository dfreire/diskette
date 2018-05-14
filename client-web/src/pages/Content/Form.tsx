import * as React from 'react';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import * as ContentModel from '../../models/Content';
import * as UiModel from '../../models/Ui';
import * as Types from '../../models/Types';
import Tabs from '../../components/Tabs';
import TextField from '../../components/TextField';
import TextAreaField from '../../components/TextAreaField';
import ImageField from '../../components/ImageField';
import NumberField from '../../components/NumberField';
import LinkField from '../../components/LinkField';

interface Props extends ContentModel.State, ContentModel.Dispatch, UiModel.State {
    location: Location;
}

const Form = (props: Props) => {
    const { pathname } = props.location;
    const messages = props.messages.contentPage;
    const hasTabs = props.contentPage.contentType.tabs.length > 0;

    return hasTabs && (
        <div className={classes.container}>
            <div className={classes.tabsContainer}>
                <Tabs titles={props.contentPage.contentType.tabs.map(tab => tab.title)}>
                    {props.contentPage.contentType.tabs.map((tab, i) => (
                        <Tab key={tab.title} {...props} tabIndex={i} />
                    ))}
                </Tabs>
            </div>
            <div className={classes.buttonsContainer}>
                <button className={classes.saveButton} onClick={() => props.save({ pathname })}>{messages.saveButton}</button>
                <button className={classes.cancelButton} onClick={() => props.load({ pathname })}>{messages.cancelButton}</button>
            </div>
        </div>
    );
}

const classes = {
    container: '',
    buttonsContainer: 'p-4 text-left bg-white _border-b text-sm',
    saveButton: 'inline-block w-32 p-3 mr-1 rounded text-white bg-green hover:bg-green-light',
    cancelButton: 'inline-block w-32 p-3 mx-1 rounded text-grey-dark bg-grey-lighter hover:text-grey-darkest',
    tabsContainer: 'p-4',
};

interface TabProps extends Props {
    tabIndex: number;
}

const Tab = (props: TabProps) => {
    const fieldTypes = props.contentPage.contentType.tabs[props.tabIndex].fields;
    const fieldValues = props.contentPage.content.fields;

    return (
        <div>
            {fieldTypes.map(fieldType => {
                const key = fieldType.key;
                const value = fieldValues[key];
                return <Field {...props} key={key} fieldType={fieldType} value={value} />;
            })}
        </div>
    );
}

interface FieldProps extends Props {
    fieldType: Types.Field;
    value: any;
}

const Field = (props: FieldProps) => {
    switch (props.fieldType.type) {
        case 'text':
            return (
                <TextField
                    label={props.fieldType.label}
                    value={props.value || ''}
                    onChange={(value) => props.setValue({ key: props.fieldType.key, value })}
                />
            );
        case 'textarea':
            return (
                <TextAreaField
                    label={props.fieldType.label}
                    value={props.value || ''}
                    onChange={(value) => props.setValue({ key: props.fieldType.key, value })}
                />
            );
        case 'number':
            return (
                <NumberField
                    label={props.fieldType.label}
                    value={props.value}
                    onChange={(value) => props.setValue({ key: props.fieldType.key, value })}
                />
            );
        case 'image':
            return (
                <ImageField
                    label={props.fieldType.label}
                    value={getImgSrc(props)}
                    onUpload={(fileList) => props.upload({ pathname: props.location.pathname, fileKey: props.fieldType.key, fileList })}
                    onRemove={() => props.setValue({ key: props.fieldType.key, value: '' })}
                />
            );
        case 'link':
            return (
                <LinkField
                    label={props.fieldType.label}
                    value={props.value || ''}
                    onChange={(value) => props.setValue({ key: props.fieldType.key, value })}
                />
            );
        default:
            return (
                <div>
                    <h1>{props.fieldType.key}</h1>
                    <div>{props.fieldType.label}</div>
                    <div>{JSON.stringify(props.value)}</div>
                </div>
            );
    }
}

function getImgSrc(props: FieldProps) {
    const { value, location, fieldType } = props;
    const { pathname } = location;
    const { width, height } = fieldType as Types.ImageField;

    let imgSrc = '';

    if (value != null && value.length > 0) {
        imgSrc = [
            '/api/files',
            ...pathname.split('/').filter(t => t.length > 0).slice(1),
            value,
        ].join('/');

        imgSrc += '?' + queryString.stringify({ w: width, h: height })
    }

    return imgSrc;
}

const mapState = (models: { content: ContentModel.State, ui: UiModel.State }) => ({
    messages: models.ui.messages,
    contentPage: models.content.contentPage,
});

const mapDispatch = (models: { content: ContentModel.Dispatch }) => ({
    setValue: models.content.setValue,
    save: models.content.save,
    load: models.content.load,
    upload: models.content.upload,
}) as any;

export default connect(mapState, mapDispatch)(Form as any);