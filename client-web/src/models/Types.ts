export interface Content {
    type: string;
    fields: object;
    subDirs: string[];
}

export interface ContentType {
    title: string;
    tabs: Tab[];
}

export interface Tab {
    title: string;
    fields: Field[];
}

export interface Field {
    label: string;
    key: string;
    type: 'text' | 'textarea' | 'number' | 'image';
}

export interface TextField extends Field {
    type: 'text';
    value: string;
}

export interface TextAreaField extends Field {
    type: 'textarea';
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