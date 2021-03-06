import React from 'react';
import { Button } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';

/**
 * DownloadCSV BUTTON ~~~ Downloads relevant data
 * State -> data
 */
class DownloadCSV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  updateStats(data) {
    this.setState({ data: data });
    // if (data.capetown.male && data.capetown.female && data.johannesburg.male && data.johannesburg.female) { console.log("popop", [data.capetown.male, data.capetown.female, data.johannesburg.male, data.johannesburg.female]); }
  }
  objectToCSV(data) {
    const csvRows = [];
    const headers = [];
    for (let headElem in data[0]) {
      const escapedHead = ('' + headElem).replace(/"/g, '\\"');
      headers.push(`"${escapedHead}"`);
    }
    csvRows.push(headers.join(','));
    for (let elem in data) {
      if (elem !== 0) {
        const toAdd = [];
        for (let val in data[elem]) {
          const escaped = ('' + data[elem][val]).replace(/"/g, '\\"');
          toAdd.push(`"${escaped}"`);
        }
        csvRows.push(toAdd.join(','));
      }
    }
    return csvRows.join('\n');
  }
  download(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  onClick = e => {
    const cd = this.objectToCSV(this.state.data);
    this.download(cd);
  };
  render() {
    return (
      <div>
        <div>
          <Button floated='right' onClick={this.onClick}>
            Download CSV
          </Button>
        </div>
      </div>
    );
  }
}

export default DownloadCSV;
