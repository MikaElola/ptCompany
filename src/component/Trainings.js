import React, { Component } from 'react';
import ReactTable from 'react-table';
import TrainingForm from './TrainingForm';
import 'react-table/react-table.css';
import * as moment from 'moment';
import 'moment/locale/fi';

//tehä kalenterin vaihto ilman napin painnalusta nyt vähä turha....
class Trainings extends Component {
  constructor(props){
    super(props)
    this.state = {
      train: [],
      cust: []
      }
  }
  componentDidMount = () => {
    this.getTrainings();
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

  getTrainings = async() => { 
  await fetch('https://customerrest.herokuapp.com/api/trainings')
  .then((response) => response.json())
  .then((responseData) => { //do we want the time or nah... right now no time only datez  
    responseData.content.forEach((element, i) => {
      console.log(i + " " + element.date)
      let momentObj = moment(element.date); //2019-04-26T00:00:00.000+0000
      let momentString = momentObj.format('DD-MM-YYYY'); // 2016-07-15
      element.date = momentString;
    })

   this.setState({
      train: responseData.content
    });
  });
 
  var time = this.state.train[0].date
  time = moment(time);
  console.log(this.state.train + "   " + time)
  };
  
  addTraining = (newTrain) => {
    console.log("AddTrainging called")
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
          'Content-type' : 'application/json'
      },
      body: JSON.stringify(newTrain)
  })
      .then(res => this.getTrainings())
  };
  deleteTrain = (value) => {
    if(window.confirm("Are you sure?")) {
    fetch(value, {method: "DELETE"})
    .then(res => this.getTrainings())
    .catch(err => console.log(err));
  }
};


  render() {
    const columns = [{
      Header: 'Training'
      ,
      accessor: 'activity' // String-based value accessors!
      }, {
      Header: 'Date'
      ,
      accessor: 'date'
      },
      {
      Header: 'Duration'
      ,
      accessor: 'duration'
      },{
        Header: '',
        accessor: "links[1].href",
        filterable: false,
        sortable: false,
        Cell: ({ value }) =>(
          <di>
            <button onClick={() => this.deleteTrain(value)}>Delete</button>
          </di>
        )}]
    return (
      <div className="App">
        <h1>Training</h1>
        
        <ReactTable data={this.state.train}
        columns={columns}  sortable={true} filterable={true}
        defaultPageSize={5}/> 
     
      <TrainingForm addTraining={this.addTraining} cust={this.state.cust}></TrainingForm>
      </div>
    );
  }
}
export default Trainings;
