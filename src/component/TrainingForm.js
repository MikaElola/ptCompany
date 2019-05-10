import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';


class TrainingForm extends Component {
    constructor(props){
      super(props)//pass customers to this somehow through Router i guess
      this.state = {
        date: '', 
        duration: '', 
        activity: '',
        customer: '',
        show: false,
       }
    }
newTraining = () => {
    let newTrain = {
        date : this.state.date,
        duration : this.state.duration,
        activity : this.state.activity,
        customer : this.state.customer,
    }
    if(newTrain.date === "" || newTrain.activity === ""){
      alert("Syötä tarvittavat tiedot!")
      return;
  }
    this.props.addTraining(newTrain);
    this.setState({
      date: '', 
      duration: '', 
      activity: '',
      customer: '',
    })
}

handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

show = () => {
    this.setState({ show : !this.state.show})
}

  //ei anna asettaa alku aikaa? Hajoaa kun vaihtaa ton datetime setiks. Jo kannassa olevat on kuitenki tällä formaatilla...?
  render() {

    return (
    <div>
        <Button variant="contained" color="primary" onClick={this.show}>Rekisteröi Harjoite
                </Button>
        {this.state.show ? (
        <form>
            <div>
            <TextField autoFocus margin="dense" type="date" defaultValue="" name="date" value={this.state.date} onChange={this.handleChange} label="Date" fullWidth/>
            <TextField margin="dense" name="duration" value={this.state.duration} onChange={this.handleChange} label="Duration (min)" fullWidth/>
            <TextField margin="dense" name="activity" value={this.state.activity} onChange={this.handleChange} label="Activity" fullWidth/>
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
            {this.props.cust.map(function(customer, i){
              return <MenuItem value={customer.links[0].href}>{customer.firstname} {customer.lastname}</MenuItem>
            })}
          </Select>
            </FormControl>
            </div>
            <div>
                <Button onClick={this.newTraining} color="primary">
                Add
                </Button>
            </div>

        </form>) : (<div/>)}
    </div>
    );
  }
}
export default TrainingForm;