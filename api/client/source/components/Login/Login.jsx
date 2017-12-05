import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

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
      <div>
        <Link to="/civilian">
          <Button onClick={this.loginCivilian}>
            Civilian
          </Button>
        </Link>
        <Link to="/policelogin">
          <Button onClick={this.loginPolice}>
            Police
          </Button>
        </Link>
      </div>
    )
  }
}

export default Login;
