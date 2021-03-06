import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import TableStatus from './TableStatus';

class SelectorStatus extends React.Component {
  constructor(props) {
    super(props);
    this.tableStatusElement = React.createRef();
    this.state = {
      options: props.status_selection,
      searchQuery: '',
      selected: 'allstatus',
      demoData: [],
      filteredData: []
    };
    // console.log("StatProppies", this.state)
  }

  updateStats(data) {
    this.setState({ demoData: data, filteredData: data });
    this.tableStatusElement.current.updateStats(data);
  }

  onChange = (e, data) => {
    // console.log(data.value);
    // console.log('data', data);
    const filt = this.state.demoData.filter(elem => {
      //  console.log("arr", elem.ethnicity);
      if (data.value === 'allstatus') {
        return elem;
      } else if (data.value === 'active') {
        if (elem.active === 'active') {
          return elem;
        }
      } else if (data.value === 'selected') {
        if (elem.active === 'selected') {
          return elem;
        }
      } else if (data.value === 'no_show') {
        if (elem.active === 'no show') {
          return elem;
        }
      } else if (data.value === 'quit') {
        if (elem.active === 'quit') {
          return elem;
        }
      }
      return null;
    });
    this.setState({ selected: data.value, searchQuery: '' });
    this.tableStatusElement.current.updateStats(filt);
  };

  onSearchChange = (e, data) => {
    // console.log(data.searchQuery);
    this.setState({ searchQuery: data.searchQuery });
  };
  render() {
    const { options, searchQuery, selected } = this.state;
    return (
      <div>
        <Dropdown
          placeholder='Status'
          icon='lightning'
          floating
          labeled
          button
          className='icon'
          selection
          value={selected}
          text={searchQuery}
          onChange={this.onChange}
          onSearchChange={this.onSearchChange}
          options={options}
        />
        <div style={{ margin: '8px' }} />
        <div>
          <TableStatus ref={this.tableStatusElement} />
        </div>
      </div>
    );
  }
}

export default SelectorStatus;
