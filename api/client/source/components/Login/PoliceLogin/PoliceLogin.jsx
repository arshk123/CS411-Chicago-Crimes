import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Form, Header, Segment, Grid } from 'semantic-ui-react'
import PoliceHome from '../../PoliceHome/PoliceHome.jsx'
import axios from 'axios'

import styles from './login.scss'

class PoliceLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : "",
      password : "",
      valid_login : false,
      fbi_code : "",
      email_auth : false,
      verCodeInput : false,
      failedLogin : false,
      verificationCode : "",
      jwt : ""
    }

    this.loginPolice = this.loginPolice.bind(this);
    this.loginPoliceVerify = this.loginPoliceVerify.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.showFailedLogin = this.showFailedLogin.bind(this);
    this.showVerificationInput = this.showVerificationInput.bind(this);
  }

  showFailedLogin() {
    this.setState({
      failedLogin : true
    })
  }

  loginPoliceVerify() {
    let data = {
      "username" : this.state.username,
      "password" : this.state.password,
      "email_verification" : this.state.verificationCode
    }
    console.log(data)
    var headers = {
      "contentType" : "application/json"
    }
    axios.post("http://fa17-cs411-10.cs.illinois.edu:8280/api/login", data, headers)
    .then(function (response) {
      console.log(response)
      this.setState({
        jwt : response.user_id,
        valid_login : true,
        verCodeInput : true,

      })
    }.bind(this))
    .catch(function (error) {
      console.log(error)
      this.showFailedLogin()
    }.bind(this));
  }

  loginPolice() {
    console.log("police login")
    // console.log(this.state)
    let data = {"username" : this.state.username,
    "password" : this.state.password }
    console.log(data)
    var headers = {
      "contentType" : "application/json"
    }
    axios.post("http://fa17-cs411-10.cs.illinois.edu:8280/api/login", data, headers)
    .then(function (response) {
      console.log("response")
      console.log(response)
      this.setState({
        valid_login : true,
        verCodeInput : true
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error)
      this.showFailedLogin()
    }.bind(this));
  }

  handleUserNameChange(event) {
    console.log(event.target.value)
    this.setState({username : event.target.value});
  }

  handlePasswordChange(event) {
    console.log(event.target.value)
    this.setState({password : event.target.value});
  }

  handleCodeChange(event) {
    console.log(event.target.value)
    this.setState({
      verificationCode : event.target.value
    })
  }

  showVerificationInput() {
    this.setState({
      verCodeInput : true
    })
  }

  render() {
    console.log(this.state)
    if(this.state.valid_login && this.state.jwt != "") {
      return(
        <PoliceHome fbi_code={this.state.jwt}/>
      )
    }
    if(this.state.verCodeInput) {
      return(
        <div id="loginParent">
          <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 450 }}>
          <Form size="large">
            <Form.Input
              fluid
              placeholder='Username'
              onChange={this.handleUserNameChange}
            />
          <Form.Input
            fluid
            placeholder='Password'
            type='password'
            onChange={this.handlePasswordChange}
          />
         <Form.Input
              fluid
              placeholder='Verification Code'
              onChange={this.handleCodeChange}
            />

            <Button color='teal' fluid size='large' onClick={this.loginPoliceVerify} type='submit'> Submit</Button>
          </Form>
        </Grid.Column>
       </Grid>
        </div>
      )
    }
    let text = null
    if(this.state.failedLogin) {
      text = "Invalid Username or Password"
    }
    return (
      <div id="loginParent">
      <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
      >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          {' '}Sign in to your Account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              placeholder='Username'
              onChange={this.handleUserNameChange}
            />
          <Form.Input
            fluid
            placeholder='Password'
            type='password'
            onChange={this.handlePasswordChange}
          />
        {text}

          <Button color='teal' fluid size='large' onClick={this.loginPolice} type='submit'> Submit</Button>
          <Button color='teal' fluid size='large' onClick={this.showVerificationInput} type='submit'> Already Have a Code? </Button>
          </Segment>
        </Form>
         </Grid.Column>
      </Grid>
      </div>
    )
  }
}

export default PoliceLogin;

// https://semantic-ui.com/collections/form.html
