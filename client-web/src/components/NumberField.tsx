import * as React from 'react';
const NumberFormat = require('react-number-format');

interface Props {
    label: string;
    value: number;
    onChange: { (value: number): void }
}

interface State {
    values: NumberFormatValues;
}

interface NumberFormatValues {
    formattedValue?: string;
    value: string;
    floatValue: number;
}

class NumberField extends React.Component<Props, State> {
    state = {
        values: {
            value: this.props.value ? '' + this.props.value : '',
            floatValue: this.props.value,
        }
    };

    render() {
        const { label, onChange } = this.props;
        const { values } = this.state;

        return (
            <div className={classes.field}>
                <label className={classes.label}>{label}</label>
                <NumberFormat
                    className={classes.input}
                    decimalSeparator=","
                    decimalScale={2}
                    value={values.value}
                    isNumericString={true}
                    onValueChange={(values: NumberFormatValues) => {
                        this.setState({ values });
                    }}
                    onBlur={(evt: any) => {
                        onChange(this.state.values.floatValue);
                    }}
                />
            </div>
        );
    }
}

const classes = {
    field: "w-full py-2",
    label: "block pb-2 text-grey-darkest font-medium",
    input: "block p-2 w-full border rounded",
}

export default NumberField;
