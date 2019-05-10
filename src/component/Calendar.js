import React, { Component } from 'react';
import 'react-table/react-table.css';
import * as moment from 'moment';
import 'moment/locale/en-gb';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      train: [],
      cust: [],
      customer: "",
      customerTrainings: [],
      data: [],
      currentDate: moment(),
      }
  }
  componentDidMount = () => {
    this.getTrainings();
    this.getCustomers();

  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value, customerTrainings: [], data: []});
  
  }

  getCertainCalendar = () => {
   
    fetch(this.state.customer)
    .then((response) => response.json())
    .then((responseData) => {
        let i = 0
        while(responseData.content.length > i){
            let durationMin = new Date(responseData.content[i].date).getMinutes()  + responseData.content[i].duration;
            let newData = {
                title: responseData.content[i].activity,
                startDate: new Date(responseData.content[i].date), //responseData.content[i].date,
                endDate: new Date(responseData.content[i].date).setMinutes(durationMin),
                id: i,
                location: "",
            }
            i++
            this.setState({
                data: [...this.state.data, newData],
                customerTrainings: responseData.content
            })
    }
    })
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
  
  currentDateChange = (currentDate) => { this.setState({ currentDate }); };



  render() {
    return (
      <div className="App">
        <h1>Calendar</h1>
        <FormControl fullWidth>
            <InputLabel htmlFor="cust">Customer</InputLabel>
            <Select
            value={this.state.customer}
            onChange={this.handleChange}
            input={<Input name="customer" id="cust" />}
            inputProps={{ //tähä menuitemeihin joku map jne saadaa kaikki customerit tohon value = index ja sit nimellä value cust.lastname jne 
              name: 'customer',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem> 
            {this.state.cust.map(function(customer, i){
              return <MenuItem value={customer.links[2].href}>{customer.firstname} {customer.lastname}</MenuItem>
            })}
          </Select>
            </FormControl>
            <Button onClick={this.getCertainCalendar} color="primary">
                Get Calendar
                </Button>

        <MuiThemeProvider theme={theme}>
        <Paper>
          <Scheduler data={this.state.data}>
            <ViewState currentDate={this.state.currentDate}
            onCurrentDateChange={this.currentDateChange} />
            <Toolbar />
            <DateNavigator />
            <MonthView />
            <Appointments />
          </Scheduler>
        </Paper>
      </MuiThemeProvider>
      </div>
    );
  }
}
export default Calendar;
