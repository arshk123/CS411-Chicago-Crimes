import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Item from './Container.jsx'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

class MyMarker extends Component {
  constructor(props){
    super(props);
    this.state  = {
      isOpen : false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      isOpen : !this.state.isOpen
    })
  }

  render() {
    return (
      <Marker
        position={{ lat:this.props.data['latitude'], lng:this.props.data['longitude'] }}
        onClick={this.toggle}>
        {
          this.state.isOpen && <InfoWindow onCloseClick={this.toggle}>
          <div> {"Location: " + this.props.data['block']}, {"ID: " + this.props.data['id']}, {"Crime Severity: "+ this.props.data['crime_index'].toFixed(2)}

          </div>
          </InfoWindow>
        }
      </Marker>
    )
  }
}

export default MyMarker;
