import {React, Component} from 'react';
import {Link, Redirect} from 'react-router-dom'

import './Profile.css';
import {TextField, Button} from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Calendar from '@material-ui/icons/CalendarTodayOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ArrowForward from '@material-ui/icons/ArrowForward'
import { makeStyles } from '@material-ui/core/styles';
import arrow from '../assets/Icon feather-arrow-right.svg';
import {signout, getUser, isAuthenticated, create} from '../api/index'


class Profile extends Component {
  //const classes = useStyles();

  constructor(){
    super ()
    this.state = {
      email:"",
        name: "",
        dob: "",
        bio: "",
        image: "",
        error: "",
        name_error: "",
        dob_error: "",
        bio_error: "",
        image_error: "",
        redirect: false,
    }
  }

  // This function will be executed once the page is loaded
  componentDidMount(){
    
    const emailId = isAuthenticated().user.email; // Fetches the email from cache storage i chrome
    
    this.setState({email: emailId})
    this.postData = new FormData() // FormData is used to send photo to backend
  };
  

  handleChange = (name) => (event) => {
    var value = name === "image" ? event.target.files[0] : event.target.value;
    this.postData.set(name, value);  // Assigns the values entered in the form to postData
    this.setState({[name]: event.target.value}); // Assigns the values entered in the form to state

    //Removes the error message on the change made on image upload
    if((name==="image") && (this.state.image_error !== "")){
      this.setState({image_error: ""})
    }
  };

  
  //This function will be executed on the submit button click
  clickSubmit = event => {
    event.preventDefault();
    const {name, dob, bio, image} = this.state

    // Check whether image is selected or not
    if(this.state.image === ""){
      this.setState({image_error: "Upload fehlgeschlagen"})
      return;
    }

      
    const profile = {
        name,
        dob,
        bio,
        image
    };

    
          const userId = isAuthenticated().user._id //Gets the user id from cache storage
          const token = isAuthenticated().token //Gets the token from cache storage

            
          create(userId, token, this.postData)//Function call to send the data to backend
            .then(data => {                
                if(data.error) this.setState({error: data.error})
                else {
                    this.setState({ name:"", dob:"", bio:"", image: ""})
                    alert("Successfully Submitted");
                }
          });
    
  };

  //UI of the Page
  render() {

    //Redirection on change of state
    if(this.state.redirect){
      return <Redirect to="/" />
    }

    //Actual UI Design
  return (
    <div className="body1">

      {/* Logout Button */}
      <Link onClick={()=>signout().then(data => {
        this.setState({redirect: true})
      })}>
        <p className="logout"></p>           
      </Link>


      {/* Glassmorphism Design */}
      <p className="first-square"></p>
      <div className="second-square">
      </div>
      
        <div className="details">
        
          <div className="row">
          <div className="col">
            <h3 className="user">Hey, {this.state.email}</h3>
            <p className="default">Bitte fulle dein Profil aus</p>

            {/* Image upload container */}
            <div className="container">
              <input type="file" className="file-upload" accept="image/*" onChange={this.handleChange("image")}/>
              <div className="camera"></div>  
            </div>
             
             {/* Display error message */}
              <p className="image-error">{this.state.image_error}</p>
          </div>
          
        <br/>
        <div className="col">
        

        {/* Name Text field */}
        <TextField
        className="textfield"
        id="input-with-icon-textfield"
        style={{color: "blue"}}
        label="Name"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <PersonOutline style={{ color: "blue" }}/>
            </InputAdornment>
          ),
        }}
        onChange={this.handleChange("name")}
      />
      

        {/* Date of Birth field */}
        <TextField
        className="date"
        id="input-with-icon-textfield"
        label="Geburtsdatum"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Calendar style={{ color: "blue" }}/>
            </InputAdornment>
          ),
        }}
        onChange={this.handleChange("dob")}
      />
     

        {/* Description or Bio Field */}
        <TextField
        multiline = "true"
        rows="5"
        className="desc"
        id="input-with-icon-textfield"
        label="Geburtsdatum"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <CreateOutlinedIcon style={{ color: "blue", marginTop: "-70px" }}/>
            </InputAdornment>
          ),
        }}
        onChange={this.handleChange("bio")}
      />
      

        {/* Submit Button */}
        <Button  className="submit" onClick={this.clickSubmit}>
        <p className="arrow"/>
        </Button>

      </div>
    </div>        
        
      </div>
    </div>
  );
      }
}

export default Profile;
