import * as React from 'react';

interface Props {
  titles: string[];
}

interface State {
  activeIndex: number;
}

class Tabs extends React.Component<Props, State> {
  state = {
    activeIndex: 0,
  };

  render() {
    return (
      <div>
        {this.props.titles.map((title, i) => (
          <Tab
            key={title}
            title={title}
            active={this.state.activeIndex === i}
            onClick={evt => {
              evt.preventDefault();
              evt.stopPropagation();
              this.setState({ activeIndex: i });
            }}
          />
        ))}
        {React.Children.toArray(this.props.children).find((child, i) => this.state.activeIndex === i)}
      </div>
    );
  }
}

const Tab = (props: { title: string; active: boolean; onClick: { (evt: any): void } }) => {
  const className = props.active ? classes.activeTab : classes.regularTab;

  return (
    <a className={className} onClick={props.onClick} href="">
      <div>{props.title}</div>
    </a>
  );
};

const classes = {
  regularTab: 'inline-block mr-4 mb-4 p-1 text-lg no-underline text-grey',
  activeTab: 'inline-block mr-4 mb-4 p-1 text-lg no-underline text-black border-b-2 border-black',
};

export default Tabs;
