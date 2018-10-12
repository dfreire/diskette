import axios from 'axios';
import * as React from 'react';
const { Icon } = require('react-fa');
import { SelectOption } from '../models/Types';
import FilterSelectModal from './FilterSelectModal';

interface Props {
  label: string;
  value: string;
  onChange: { (value: string | number): void };
  filter: string;
}

interface State {
  isModalOpen: boolean;
  options: SelectOption[];
}

class FilterSelectField extends React.Component<Props, State> {
  state = {
    isModalOpen: false,
    options: [],
  } as State;

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  onSelect = (option: SelectOption) => {
    this.props.onChange(option.value);
    this.setState({ isModalOpen: false });
  };

  render() {
    const { label, value, filter } = this.props;
    const { isModalOpen, options } = this.state;

    const selectedOption = options.find(option => option.value === value);
    const selectedOptionLabel = (selectedOption != null && selectedOption.label) || '';

    return (
      <div className={classes.field}>
        <FilterSelectModal
          filter={filter}
          title={label}
          isModalOpen={isModalOpen}
          closeModal={this.closeModal}
          onSelect={this.onSelect}
          options={options}
        />

        <label className={classes.label}>{label}</label>
        <div className={classes.inputContainer}>
          <input className={classes.input} type="text" value={selectedOptionLabel} onClick={this.openModal} disabled />
          <div className={classes.dropdownIcon} onClick={() => this.props.onChange('')}>
            <Icon name="times" />
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
  inputContainer: 'relative block w-full border rounded bg-grey-lighter hover:bg-grey-lightest',
  input: 'appearance-none inline-block w-full absolute pin p-2 bg-transparent cursor-pointer',
  dropdownIcon: 'inline-block w-full text-right p-2 bg-transparent',
};

export default FilterSelectField;
