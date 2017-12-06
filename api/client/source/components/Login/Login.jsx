import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Image, Segment } from 'semantic-ui-react'

class Login extends Component {
  constructor(props) {
    super(props)
    this.loginCivilian = this.loginCivilian.bind(this);
    this.loginPolice = this.loginPolice.bind(this);
  }

  loginCivilian() {

  }

  loginPolice() {

  }

  render() {
    return (
      <div id="loginParent">
        <Segment>
          <h2> Chicago Crime Tracker </h2>
          <div id="images">
          <Image src="/assets/chicago-pd.png" size="medium" centered/>
          </div>
          <div id="loginChild">

        </div>
      </Segment>
      <Segment>
        <Link to="/civilian">
          <Button color='teal' fluid onClick={this.loginCivilian}>
            Civilian
          </Button>
        </Link>
        <Link to="/policelogin">
          <Button color='teal' fluid onClick={this.loginPolice}>
            Police
          </Button>
        </Link>
      </Segment>
      </div>
    )
  }
}

export default Login;
