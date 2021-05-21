import {React, Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import './Signup.css';
import {TextField, Button} from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonOutline from '@material-ui/icons/PersonOutline';
import LockOutline from '@material-ui/icons/LockOutlined'
import {signin, authenticate} from '../api/index'



class Signin extends Component {
  constructor(){
    super ()
    this.state = {
        email: "",
        password: "",
        error: "",
        password_error: "",
        redirect: false,
    }
  }

  //Getting the details entered in the form fields
  handleChange = (name) => (event) => {
    this.setState({error: ""})
    this.setState({[name]: event.target.value});

    //Remove Password Error Message - Client Side
    if((name=="password") && (this.state.password_error != "")){
      this.setState({password_error: ""})
    }
  };

  //This function will be executed on submit button click
  clickSubmit = event => {
    event.preventDefault();
    const {email, password} = this.state

    //Password length validation
    if(password.length<8){
      this.setState({password_error: "Login fehlgeschlagen. Hast du dich vertippt?"})
      return;
    }
    else{
        this.setState({password_error: ""})
      }

      
    const user = {
        email,
        password,
    };

    //Function call to send the details entered in form to check for the user on database for authentication
    signin(user)
    .then(data => {
        if(data.error) this.setState({error: data.error})
        else authenticate(data, () => {
            this.setState({
              email: "",
              password: "",
              error: "",
              password_error: "",
                redirect: true
        });
    })}
    );
    
  };

  //UI design is designed here
  render(){

    //Redirection on successful signin
    if(this.state.redirect){
      return <Redirect to="/profile" />
    }

    //Actual UI design code
  return (
    <div className="body">

      {/* Glassmorphsim Effect/Design */}
      <p className="background1"></p>
      <div className="background2"> </div>
        <div className="form">
        <h2 className="h2">Anmelden</h2>
        
        {/* Email Textfield */}
        <TextField
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

      {/* Password Textfield */}
        <TextField
        type="password"
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

        {/* Displaying Password Error */}
        <p className="password-error">{this.state.password_error}</p>

        {/* Submit Button */}
      <Button  className="submit" onClick={this.clickSubmit}>
      <p className="arrow"/>
      </Button>

        <p className="have-account">Nock Keinen Account? <Link to="/" style={{color: "white"}}>Registrieren</Link></p>

                   
        
      </div>
    </div>
  );
      }
}

export default Signin;
