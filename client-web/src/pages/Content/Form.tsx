import * as React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import * as ContentModel from '../../models/Content';
import * as UiModel from '../../models/Ui';
import * as Types from '../../models/Types';
import Tabs from '../../components/Tabs';
import TextField from '../../components/TextField';
import TextAreaField from '../../components/TextAreaField';
import FileField from '../../components/FileField';
import ImageField from '../../components/ImageField';
import NumberField from '../../components/NumberField';
import LinkField from '../../components/LinkField';
import SelectField from '../../components/SelectField';
import QuerySelectField from '../../components/QuerySelectField';
const { Icon } = require('react-fa');

interface Props extends ContentModel.State, ContentModel.Dispatch, UiModel.State {
  history: any;
  location: Location;
}

const Form = (props: Props) => {
  const { pathname } = props.location;
  const messages = props.messages.contentPage;
  const hasTabs = props.contentPage.contentType.tabs.length > 0;
  const { isSaving } = props;

  return (
    hasTabs && (
      <div className={classes.container}>
        <div className={classes.tabsContainer}>
          <Tabs titles={props.contentPage.contentType.tabs.map(tab => tab.title)}>
            {props.contentPage.contentType.tabs.map((tab, i) => (
              <Tab key={tab.title} {...props} tabIndex={i} />
            ))}
          </Tabs>
        </div>
        <div className={classes.buttonsContainer}>
          <button className={classes.saveButton} onClick={() => !isSaving && props.save({ pathname })}>
            {isSaving ? <span className="loading bullet" /> : messages.saveButton}
          </button>
          <button
            className={classes.cancelButton}
            onClick={() => {
              const tokens = props.location.pathname.split('/');
              const parent = tokens.slice(0, tokens.length - 1).join('/');
              props.history.push(parent);
              // props.history.goBack();
            }}
          >
            {messages.cancelButton}
          </button>
        </div>
      </div>
    )
  );
};

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
  const { contentType, content } = props.contentPage;
  const tab = contentType.tabs[props.tabIndex];

  const fields = tab.fieldKeys.map(item => {
    const tokens = item.split(':');
    if (tokens.length === 1) {
      const key = item;
      return contentType.fields.find(f => f.key === key);
    } else {
      const key = tokens[0];
      const subKeys = tokens[1].split(',');
      const field = contentType.fields.find(f => f.key === key) as Types.ArrayField;
      return {
        ...field,
        fields: field.fields.filter(f => subKeys.indexOf(f.key) >= 0),
      };
    }
  }) as Types.Field[];

  return (
    <div>
      {fields.map(field => (
        <Field {...props} key={field.key} field={field} value={content.fields[field.key]} />
      ))}
    </div>
  );
};

const ArrayField = (props: FieldProps) => {
  const arrayField = props.field as Types.ArrayField;
  const arrayValue = (props.value || []) as object[];

  const reorder = (original: object[], oldPos: number, newPos: number) => {
    const reordered = Array.from(original);
    const [removed] = reordered.splice(oldPos, 1);
    reordered.splice(newPos, 0, removed);
    return reordered;
  };

  const onDragEnd = (result: DropResult, provided: any) => {
    if (result.source != null && result.destination != null) {
      const oldPos = result.source.index;
      const newPos = result.destination.index;
      const reordered = reorder(arrayValue, oldPos, newPos);
      props.setValue({ key: arrayField.key, value: reordered });
    }
  };

  return (
    <React.Fragment>
      <h3 className="mt-3 mb-1">{arrayField.label}</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {arrayValue.map((item, i) => (
                <Draggable key={`${arrayField.key}.${i}`} draggableId={`draggable-${i}`} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps as any}
                      {...provided.dragHandleProps as any}
                      className="bg-white border rounded p-2 mt-2 relative"
                    >
                      <div className="absolute pin-t pin-r">
                        <button
                          className="p-1 text-grey hover:text-red"
                          onClick={() => {
                            props.setValue({ key: `${arrayField.key}[${i}]`, value: null });
                          }}
                        >
                          <Icon name="minus-circle" />
                        </button>
                      </div>
                      {arrayField.fields.map(field => {
                        const value = (item || {})[field.key];
                        const _field = {
                          ...field,
                          key: `${arrayField.key}[${i}].${field.key}`,
                        };
                        return <Field {...props} key={field.key} field={_field} value={value} />;
                      })}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="text-right">
        <button
          className="p-1 text-grey hover:text-green"
          onClick={() => {
            props.setValue({ key: `${arrayField.key}[${arrayValue.length}]`, value: {} });
          }}
        >
          <Icon name="plus-circle" />
        </button>
      </div>
    </React.Fragment>
  );
};

interface FieldProps {
  setValue: { (payload: { key: string; value: any }): void };
  upload: { (payload: { pathname: string; fieldKey: string; fileList: FileList }): void };
  location: Location;
  field: Types.Field;
  value: any;
}

const Field = (props: FieldProps) => {
  switch (props.field.type) {
    case 'text':
      return (
        <TextField
          label={props.field.label}
          value={props.value || ''}
          onChange={value => props.setValue({ key: props.field.key, value })}
        />
      );
    case 'textarea':
      return (
        <TextAreaField
          label={props.field.label}
          value={props.value || ''}
          rows={(props.field as Types.TextAreaField).rows || 10}
          onChange={value => props.setValue({ key: props.field.key, value })}
        />
      );
    case 'number':
      return (
        <NumberField
          label={props.field.label}
          value={props.value}
          onChange={value => props.setValue({ key: props.field.key, value })}
        />
      );
    case 'image':
      return (
        <ImageField
          label={props.field.label}
          value={getFileLink(props)}
          onUpload={fileList =>
            props.upload({
              pathname: props.location.pathname,
              fieldKey: props.field.key,
              fileList,
            })
          }
          onRemove={() => props.setValue({ key: props.field.key, value: '' })}
        />
      );
    case 'file':
      return (
        <FileField
          label={props.field.label}
          value={getFileLink(props)}
          onUpload={fileList =>
            props.upload({
              pathname: props.location.pathname,
              fieldKey: props.field.key,
              fileList,
            })
          }
          onRemove={() => props.setValue({ key: props.field.key, value: '' })}
        />
      );
    case 'link':
      return (
        <LinkField
          label={props.field.label}
          value={props.value || ''}
          onChange={value => props.setValue({ key: props.field.key, value })}
        />
      );
    case 'select':
      return (
        <SelectField
          label={props.field.label}
          value={props.value || ''}
          options={(props.field as Types.SelectField).options}
          onChange={value => props.setValue({ key: props.field.key, value })}
        />
      );
    case 'query_select':
      return (
        <QuerySelectField
          label={props.field.label}
          value={props.value || ''}
          query={(props.field as Types.QuerySelectField).query}
          onChange={value => props.setValue({ key: props.field.key, value })}
        />
      );
    case 'array':
      return <ArrayField {...props} />;
    default:
      return (
        <div>
          <h1>{props.field.key}</h1>
          <div>{props.field.label}</div>
          <div>{JSON.stringify(props.value)}</div>
        </div>
      );
  }
};

function getFileLink(props: FieldProps) {
  const { value, location, field } = props;
  const { pathname } = location;

  let link = '';

  if (value != null && value.length > 0) {
    link = [
      '/api/files',
      ...pathname
        .split('/')
        .filter(t => t.length > 0)
        .slice(1),
      value,
    ].join('/');

    if (field.type === 'image') {
      const { width, height } = field as Types.ImageField;
      link += '?' + queryString.stringify({ w: width, h: height });
    }
  }

  return link;
}

const mapState = (models: { content: ContentModel.State; ui: UiModel.State }) => ({
  messages: models.ui.messages,
  contentPage: models.content.contentPage,
  isSaving: models.content.isSaving,
});

const mapDispatch = (models: { content: ContentModel.Dispatch }) =>
  ({
    setValue: models.content.setValue,
    save: models.content.save,
    load: models.content.load,
    upload: models.content.upload,
  } as any);

export default connect(
  mapState,
  mapDispatch,
)(Form as any);
