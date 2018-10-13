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
          <input className={classes.input} type="text" value={selectedOptionLabel} disabled />
          <div className={classes.buttonsContainer}>
            <button className={classes.button} onClick={this.openModal}>
              <Icon name="search" />
            </button>
            <button className={classes.button} onClick={() => this.props.onChange('')}>
              <Icon name="trash" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const { data } = await axios.get(`/api/query/${this.props.filter}`);
    this.setState({ options: data });
  }
}

const classes = {
  field: 'w-full py-2',
  label: 'block pb-2 text-grey-darkest font-medium',
  inputContainer: 'w-full border rounded relative',
  input: 'inline-block w-full bg-grey-lightest flex-1 p-2',
  buttonsContainer: 'absolute pin-t pin-r bg-grey-lightest p-1 rounded-bl',
  button: 'p-1 text-grey hover:text-black',
};

export default FilterSelectField;
