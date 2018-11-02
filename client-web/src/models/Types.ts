export interface Content {
  type: string;
  fields: { [key: string]: any };
}

export interface ContentType {
  title: string;
  tabs: Tab[];
  fields: Field[];
  subTypes: string[];
}

export interface Tab {
  title: string;
  fieldKeys: string[];
}

export interface Field {
  label: string;
  key: string;
  type: 'text' | 'textarea' | 'number' | 'image' | 'file' | 'link' | 'select' | 'query_select' | 'array';
}

export interface TextField extends Field {
  type: 'text';
  value: string;
}

export interface TextAreaField extends Field {
  type: 'textarea';
  rows?: number;
  value: string;
}

export interface NumberField extends Field {
  type: 'number';
  value: number;
  decimalPlaces: number;
  decimalSeparator: string;
  thousandSeparator: string;
  prefix: string;
  suffix: string;
}

export interface ImageField extends Field {
  type: 'image';
  value: string;
  width: number;
  height: number;
}

export interface FileField extends Field {
  type: 'file';
  value: string;
}

export interface LinkField extends Field {
  type: 'link';
  value: string;
}

export interface SelectField extends Field {
  type: 'select';
  options: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface QuerySelectField extends Field {
  type: 'query_select';
  query: string;
  value: string | number;
}

export interface ArrayField extends Field {
  type: 'array';
  fields: Field[];
  value: object[];
}
