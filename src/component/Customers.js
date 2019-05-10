import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import CustomerForm from './CustomerForm';
import CustomerEdit from './CustomerEdit';

class Customers extends Component {
  constructor(props){
    super(props)
    this.state = {
      cust: []
      }
  }

  componentDidMount =  () => { 
    this.getCustomers();
  }

  getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
  .then((response) => response.json())
  .then((responseData) => {
    this.setState({
      cust: responseData.content
    });
  });
  }

  addCustomer = (newCust) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
    method: 'POST',
    headers: {
        'Content-type' : 'application/json'
    },
    body: JSON.stringify(newCust)
})
    .then(res => this.getCustomers())
}

  deleteCustomer = (value) => {
    if(window.confirm("Are you sure?")) {
    fetch(value, {method: "DELETE"})
    .then(res => this.getCustomers())
    .catch(err => console.log(err));
  }
};

editCustomer = (link, customer) => {
  fetch(link, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
  })
  .then(res => this.getCustomers())
  .catch(err => console.error(err));   
}
  //pass states to each component and call table component with props passed?


  render() {
    const columns = [{
      Header: 'Name'
      ,
      accessor: 'firstname' // String-based value accessors!
      }, {
      Header: 'Lastname'
      ,
      accessor: 'lastname'
      }, {
        Header: 'Street',accessor: 'streetaddress',show: false
        },{
          Header: 'Post',accessor: 'postcode',show: false
          },{
          Header: 'City',accessor: 'city',show: false
          },{
            Header: 'email',accessor: 'email',show: false
            },{
              Header: 'phone',accessor: 'phone',show: false
              },
      {
        Header: '',
        accessor: "links[1].href",
        filterable: false,
        sortable: false,
        Cell: ({ value, row }) =>(
         <CustomerEdit editCustomer={this.editCustomer} customer={row} link={value} />
      )} ,{
      Header: '',
      accessor: "links[1].href",
      filterable: false,
      sortable: false,
      Cell: ({ value }) =>(
        <di>
          <button onClick={() => this.deleteCustomer(value)}>Delete</button>
        </di>
      )}
    ];
    return (
      <div className="App">
        <h1>Customers</h1>
        <ReactTable data={this.state.cust}
        columns={columns}  sortable={true} filterable={true}
        defaultPageSize={5}/> 
      <div> 
      <CustomerForm addCustomer={this.addCustomer}></CustomerForm>
      
      </div>
      </div>
    );
  }
}

export default Customers;
