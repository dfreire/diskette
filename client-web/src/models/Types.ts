export interface Content {
  type: string;
  fields: { [key: string]: any };
}

export interface ContentType {
  title: string;
  tabs: Tab[];
  fields: Field[];
}

export interface Tab {
  title: string;
  fieldKeys: string[];
}

export interface Field {
  label: string;
  key: string;
  isArrayUniqueKey?: boolean;
  type: 'text' | 'textarea' | 'number' | 'image' | 'link' | 'select' | 'filter_select';
  //  | 'group' | 'array';
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
  thousandsSeparator: string;
  prefix: string;
  suffix: string;
}

export interface ImageField extends Field {
  type: 'image';
  value: string;
  width: number;
  height: number;
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

export interface FilterSelectField extends Field {
  type: 'filter_select';
  filter: string;
  value: string | number;
}

// export interface GroupField extends Field {
//   type: 'group';
//   fields: Field[];
// }

// export interface FieldArray extends Field {
//   type: 'array';
//   field: Field;
// }
