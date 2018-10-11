import axios from 'axios';
import * as React from 'react';
import { SelectOption } from '../models/Types';
const { Icon } = require('react-fa');
import FilterSelectModal from './FilterSelectModal';

interface Props {
  label: string;
  filter: string;
  value: string;
  onChange: { (value: string): void };
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

  render() {
    const { label, value, onChange } = this.props;
    const { isModalOpen } = this.state;

    return (
      <div className={classes.field}>
        <FilterSelectModal title={label} isModalOpen={isModalOpen} closeModal={this.closeModal} />

        <label className={classes.label}>{label}</label>
        <div className={classes.inputContainer} onClick={this.openModal}>
          <input className={classes.input} type="text" value={value} onChange={evt => onChange(evt.target.value)} disabled />
          <div className={classes.dropdownIcon}>
            <Icon name="search" />
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
