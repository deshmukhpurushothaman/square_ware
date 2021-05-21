import {React, Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Signup.css';
import {TextField, Button} from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import PersonOutline from '@material-ui/icons/PersonOutline';
import LockOutline from '@material-ui/icons/LockOutlined'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { makeStyles } from '@material-ui/core/styles';
import arrow from '../assets/Icon feather-arrow-right.svg';
import {signUp} from '../api/index'



class Signup extends Component {
  
  constructor(){
    super ()
    this.state = {
        email: "",
        password: "",
        passwordconfirm: "",
        error:"",
        email_error: "",
        password_error: "",
        passwordconfirm_error: "",
        redirect: false,
    }
  }

  //Getting the details entered in the form fields
  handleChange = (name) => (event) => {
    
    this.setState({error: ""})
    this.setState({[name]: event.target.value});

    //Remove Email Error Message - Client Side
    if((name=="email") && (this.state.email_error != "")){
      this.setState({email_error: ""})
    }

    //Remove Password Error Message - Client Side
    if((name=="password") && (this.state.password_error != "")){
      this.setState({password_error: ""})
    }
    
    //Remove Password Confirm Error Message - Client Side
    if((name=="passwordconfirm") && (this.state.passwordconfirm_error != "")){
      this.setState({passwordconfirm_error: ""})
    }
    
  };

  //This function will be executed on submit button click
  clickSubmit = event => {
    event.preventDefault();
    const {email, password, passwordconfirm} = this.state

    //Email Validation - Client Side
    if((email != "") && (!email.match(/.+\@.+\..+/))){
      this.setState({email_error: "Bitte gebe eine gültige E-Mail ein."})
      return;
    }
    else{
        this.setState({email_error: ""})
      }

    //Password Validation - Client Side
    if(password.length<8){
      this.setState({password_error: "Dein Passwort muss mindestens 8 Zeichen haben."})
      return;
    }
    else{
        this.setState({password_error: ""})
      }

      //Password Confirm Validation - Client Side
    if((this.state.password != "") && (this.state.password != this.state.passwordconfirm)){
      this.setState({passwordconfirm_error: "Deine Passwörter stimmen nicht überein."})
      return;
    }
    else{
      this.setState({passwordconfirm_error: ""})
    }


    const user = {
       
        email,
        password,
        passwordconfirm
    };
    
    //Function call for sending data to backend for signing up new user
    signUp(user)
    .then(data => {
        if(data.error) this.setState({error: data.error})
        else 
            this.setState({
              email: "",
              password: "",
              passwordconfirm: "",
              error:"",
              email_error: "",
              password_error: "",
              passwordconfirm_error: "",
              redirect: true,
        });
    }
    );
  };

//UI Design is done here
render(){

  //Redirection on successful signup
  if(this.state.redirect){
    return <Redirect to="/signin" />
  }

  //Actual UI Design
  return (
    <div className="body">

      {/* Glassmorphism Effect/Design */}
      <p className="background1"></p>
      <div className="background2"></div>
        
        
        <div className="form">
        <h2 className="h2">Sign Up</h2>

        {/* Email Textfield */}
        <TextField
        type="email"
        name="email"
        id="input-with-icon-textfield"
        label="Email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <PersonOutline style={{ color: "white" }}/>
            </InputAdornment>
          ),
        }}
        onChange={this.handleChange("email")}
      />

      {/* Display Email ID Error */}
      <p className="email-error">{this.state.email_error}</p>

        {/* Password Textfield */}
        <TextField
        type="password"
        name="password"
        id="input-with-icon-textfield"
        label="Passwort"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <LockOutline style={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
        onChange={this.handleChange("password")}
      />

      {/* Display Password Error */}
      <p className="password-error">{this.state.password_error}</p>

        {/* Confirm Password Textfield */}
        <TextField
        type="password"
        name="passwordconfirm"
        id="input-with-icon-textfield"
        label="Passwort wiederholen"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <LockOutline style={{ color: "white" }}/>
            </InputAdornment>
          ),
        }}
        onChange={this.handleChange("passwordconfirm")}
      />

      {/* Confirm Password Error Message on password mismatch */}
      <p className="password-error">{this.state.passwordconfirm_error}</p>

      {/* Submit Button */}
      <Button  className="submit" onClick={this.clickSubmit}>
      <p className="arrow"/>
      </Button>

                    
        
      </div>
    </div>
  )
      }
}

export default Signup;
