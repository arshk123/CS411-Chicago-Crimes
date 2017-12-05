import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchColumn from '../Search/SearchColumn.jsx'
import { Button, Input, List } from 'semantic-ui-react'
import axios from 'axios';
import styles from './PoliceHome.scss'

import CrimeCell from '../Search/DataCell/Cell.jsx'
import Map from '../Map/Map.jsx'
import CrimeDetailView from '../CrimeDetailView/CrimeDetailView.jsx'

let fbicode = ""
class PoliceHome extends Component {
  /***
  TODO Implement Search
  TODO Implement FBI Update Crimes
  TODO Implement FBI Edit Crimes
  TODO Design
  ***/

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.search = this.search.bind(this)
    this.createListElement = this.createListElement.bind(this)
    this.selectedItem = this.selectedItem.bind(this)
    this.clearSelection = this.clearSelection.bind(this)
    // case number, description, type, fbi code, time range, arrest made and district id
    this.state = {
      search_query : "",
      results : [],
      selectedItem : false,
      selectedID : -1
    }
    if(this.props.fbi_code) {
      fbicode = this.props.fbi_code
    }
    // this.props.fbi_code must be attached with every request
  }

  selectedItem(id) {
    console.log(id)
    this.setState({
      selectedItem : true,
      selectedID : id
    })
    console.log("opening")
  }

  clearSelection() {
    this.setState({
      selectedItem : false,
      selectedID : -1
    }, () => {
      console.log(this.state)
    })
    console.log("closing")
  }

  createListElement(data){
    return (
      <CrimeCell
        header={data["description"]}
        subheader={data["block"]}
        selectionTrigger={this.selectedItem}
        id={data["crime_id"]}
        />
    )
  }

  handleChange(event) {
    if(event.target.value === "") {
      this.setState({
        search_query :  "",
        results : []
      })
    }
    else {
      this.setState({
        search_query : event.target.value
      }, () => {
        // query search
        this.search()
        console.log(this.state.search_query)
      })
    }
  }

  search() {
    var q = this.state.search_query
    console.log("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q)
    axios.get("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q)
    .then(function (response) {
      console.log(JSON.stringify(response.data["data"]["rows"]))
      this.setState({
        results : response.data["data"]["rows"]
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    });
  }

  render() {
    var listObjects = (this.state.results).map(this.createListElement)
    console.log(this.state.selectedItem)
    return (
    <div className="Home">
      <div className="navbar" id="nav">
        <Button id="popup-button"> POPUPS </Button>
        <Button id="carousel-button"> SLIDES </Button>
        <Button id="video-button"> SHOTS </Button>
        <Button id="multi-column-button"> BEANS </Button>
        <Button id="home-button"> HOME </Button>
      </div>
      <div className="content-container">
        <div className="search">
          <Input focus fluid placeholder="Search" value={this.state.search_query} onChange={this.handleChange}/>
        </div>
        <div className="filter">
          <Button id="modal-popup"> Search Options </Button>
        </div>
        <div className="map">
          <Map data={this.state.results}/>
        </div>
        <div className="DetailView">
          <List selection divided inverted relaxed id="movieList">
            { listObjects }
          </List>
        </div>
      </div>
      <CrimeDetailView
          mSelected={this.state.selectedItem}
          clearSelection={this.clearSelection}/>
    </div>
  )
  }
}

export default PoliceHome;
