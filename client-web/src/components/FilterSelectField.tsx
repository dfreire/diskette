import axios from 'axios';
import * as React from 'react';
import { SelectOption } from '../models/Types';
const { Icon } = require('react-fa');

interface Props {
  label: string;
  filter: string;
  value: string;
  onChange: { (value: string): void };
}

interface State {
  options: SelectOption[];
}

class FilterSelectField extends React.Component<Props, State> {
  state = {
    options: [],
  } as State;

  render() {
    const { label, value, onChange } = this.props;
    const { options } = this.state;

    return (
      <div className={classes.field}>
        <label className={classes.label}>{label}</label>
        <div className={classes.selectContainer}>
          <select className={classes.select} value={value} onChange={evt => onChange(evt.target.value)}>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className={classes.dropdownIcon}>
            <Icon name="caret-down" />
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const { data } = await axios.get(`/api/filter/${this.props.filter}`);
    this.setState({ options: data });
  }
}

const classes = {
  field: 'w-full py-2',
  label: 'block pb-2 text-grey-darkest font-medium',
  selectContainer: 'relative block w-full border rounded bg-grey-lighter hover:bg-grey-lightest',
  select: 'appearance-none inline-block w-full absolute pin p-2 bg-transparent',
  dropdownIcon: 'inline-block w-full text-right p-2 bg-transparent',
};

export default FilterSelectField;
