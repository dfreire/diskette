import * as React from 'react';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import * as ContentModel from '../../models/Content';
import * as Types from '../../models/Types';
import Tabs from '../../components/Tabs';
import TextField from '../../components/TextField';
import TextAreaField from '../../components/TextAreaField';
import ImageField from '../../components/ImageField';

interface Props extends ContentModel.State, ContentModel.Dispatch {
    location: Location;
}

const Form = (props: Props) => {
    return (
        <div>
            <Tabs titles={props.contentPage.contentType.tabs.map(tab => tab.title)}>
                {props.contentPage.contentType.tabs.map((tab, i) => (
                    <Tab key={tab.title} {...props} tabIndex={i} />
                ))}
            </Tabs>
        </div>
    );
}

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
    const onChange = (value: any) => {
        console.log(props.fieldType.key, value);
        props.onContentFieldChange({ key: props.fieldType.key, value });
    }

    switch (props.fieldType.type) {
        case 'text':
            return (
                <TextField
                    label={props.fieldType.label}
                    value={props.value}
                    onChange={(value) => onChange(value)}
                />
            );
        case 'textarea':
            return (
                <TextAreaField
                    label={props.fieldType.label}
                    value={props.value}
                    onChange={(value) => onChange(value)}
                />
            );
        case 'image':
            const fieldType = props.fieldType as Types.ImageField;
            const dimensions = { w: fieldType.width, h: fieldType.height };
            const value = props.value + '?' + queryString.stringify(dimensions)
            return (
                <ImageField
                    label={props.fieldType.label}
                    value={value}
                    pathname={props.location.pathname}
                    onChange={(value) => onChange(value)}
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

const mapState = (models: { content: ContentModel.State }) => ({
    contentPage: models.content.contentPage,
});

const mapDispatch = (models: { content: ContentModel.Dispatch }) => ({
    onContentFieldChange: models.content.onContentFieldChange,
}) as any;

export default connect(mapState, mapDispatch)(Form);