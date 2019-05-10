import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';


class CustomerForm extends Component {
    constructor(props){
      super(props)
      this.state = {
        firstname: '', 
        lastname: '', 
        streetaddress: '',
        postcode: '',
        city: '',
        email:  '',
        phone: '',
        show: false,
    }
    }
newCustomer = () => {
    let newCust = {
        firstname : this.state.firstname,
        lastname : this.state.lastname,
        streetaddress : this.state.streetaddress,
        postcode : this.state.postcode,
        city : this.state.city,
        email : this.state.email,
        phone : this.state.phone
    }
    if(newCust.firstname === "" || newCust.lastname === ""){
        alert("Syötä tarvittavat tiedot!")
        return;
    }
    this.props.addCustomer(newCust);
    this.setState({
        firstname: '', 
        lastname: '', 
        streetaddress: '',
        postcode: '',
        city: '',
        email:  '',
        phone: '',
    })
}

show = () => {
    this.setState({ show : !this.state.show})
}
handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
    
  render() {
    return (
    <div>
        <Button variant="contained" color="primary" onClick={this.show}>Rekisteröi Asiakas
                </Button>
        {this.state.show ? ( <form>
            <div>
            <TextField autoFocus margin="dense" name="firstname" value={this.state.firstname} onChange={this.handleChange} label="First Name" fullWidth/>
            <TextField margin="dense" name="lastname" value={this.state.lastname} onChange={this.handleChange} label="Last Name" fullWidth/>
            <TextField margin="dense" name="streetaddress" value={this.state.streetaddress} onChange={this.handleChange} label="Street Address" fullWidth/>
            <TextField margin="dense" name="postcode" value={this.state.postcode} onChange={this.handleChange} label="Postcode" fullWidth/>
            <TextField margin="dense" name="city" value={this.state.city} onChange={this.handleChange} label="City" fullWidth/>
            <TextField margin="dense" name="email" value={this.state.email} onChange={this.handleChange} label="Email" fullWidth/>
            <TextField margin="dense" name="phone" value={this.state.phone} onChange={this.handleChange} label="Phone #" fullWidth/>
            </div>
            <div>
                <Button variant="contained" onClick={this.newCustomer} color="primary">
                Add
                </Button>
            </div>

        </form>) : (<div/>)}
       
    </div>
    );
  }
}
export default CustomerForm;