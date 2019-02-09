import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DownloadCSV from './DownloadCSV';

class DemoStatsTable extends React.Component {
    constructor(props) {
        super(props);
        this.downloadCSVElement = React.createRef();
        this.state = {
            filtered: []
        };
        // console.log("inherit", this)
    }

    componentDidMount() {
        // const jay = require('../dummyDemographics.json');
        // console.log(jay);
        // this.setState({ demoData: jay, filtered:jay });
    }
    updateStats(data) {
        this.setState({ filtered: data})
        this.downloadCSVElement.current.updateStats(data)
    }
    render() {
        const cols = [
        {
            Header: 'First Name',
            accessor: 'first_name'
        },
        {
            Header: 'Last Name',
            accessor: 'last_name'
        },
        {
            Header: 'Username',
            accessor: 'username'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Campus',
            accessor: 'campus'
        },
        {
            Header: 'Gender',
            accessor: 'gender'
        },
        {
            Header: 'Ethnicity',
            accessor: 'ethnicity'
        },
        {
            Header: 'Active',
            accessor: 'active'
        }
        ];
        console.log("DemStats",this.state)
        //this.state.filtered = filt;
        console.log("Total", this.state.filtered)
        return (
            <div>
                <div>
                    <ReactTable
                        columns={cols}
                        data={this.state.filtered}
                        className={'-highlight'}
                        expanded={{
                        1: true,
                        4: true
                        }}
                    />
                </div>
                <div>
                    <DownloadCSV ref={this.downloadCSVElement}/>
                </div>
            </div>
        );
    }
}

export default DemoStatsTable;
