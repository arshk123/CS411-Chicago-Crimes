import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchColumn from '../Search/SearchColumn.jsx'
import { Button, Input, List, Modal, Header, Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import styles from './PoliceHome.scss'

import CrimeCell from '../Search/DataCell/Cell.jsx'
import Map from '../Map/Map.jsx'
import CrimeDetailView from '../CrimeDetailView/CrimeDetailView.jsx'

let type_options = [
    { value: 'OTHER OFFENSE', text: 'Other Offense'},
    { value: 'PROSTITUTION', text: 'Prostitution'},
    { value: 'THEFT', text: 'Theft'},
    { value: 'LIQUOR LAW VIOLATION', text: 'Liquor Law Violation'},
    { value: 'NON-CRIMINAL', text: 'Non-criminal'},
    { value: 'PUBLIC PEACE VIOLATION', text: 'Public Peace Violation'},
    { value: 'BURGLARY', text: 'Burglary'},
    { value: 'HOMICIDE', text: 'Homicide'},
    { value: 'BATTERY', text: 'Battery'},
    { value: 'ARSON', text: 'Arson'},
    { value: 'NARCOTICS', text: 'Narcotics'},
    { value: 'OFFENSE INVOLVING CHILDREN', text: 'Offenses Involving Children'},
    { value: 'GAMBLING', text: 'Gambling'},
    { value: 'HUMAN TRAFFICKING', text: 'Human Trafficking'},
    { value: 'ASSAULT', text: 'Assault'},
    { value: 'MOTOR VEHICLE THEFT', text: 'Motor Vehicle Theft'},
    { value: 'INTIMIDATION', text: 'Intimidation'},
    { value: 'PUBLIC INDECENCY', text: 'Public Indecency'},
    { value: 'CONCEALED CARRY LICENSE VIOLATION', text: 'Concealed Carry License Violation'},
    { value: 'ROBBERY', text: 'Robbery'},
    { value: 'WEAPONS VIOLATION', text: 'Weapons Violation'},
    { value: 'KIDNAPPING', text: 'Kidnapping'},
    { value: 'INTERFERENCE WITH PUBLIC OFFICER', text: 'Interference with Public Officer'},
    { value: 'NON-CRIMINAL (SUBJECT SPECIFIED)', text: 'Non-criminal (Subject Specified)'},
    { value: 'CRIM SEXUAL ASSAULT', text: 'Criminal Sexual Assault'},
    { value: 'CRIMINAL TRESPASS', text: 'Criminal Trespassing'},
    { value: 'CRIMINAL DAMAGE', text: 'Criminal Damage'},
    { value: 'SEX OFFENSE', text: 'Sex Offense'},
    { value: 'STALKING', text: 'Stalking'},
    { value: 'OTHER NARCOTIC VIOLATION', text: 'Other Narcotic Violation'},
    { value: 'DECEPTIVE PRACTICE', text: 'Deceptive Practice'},
    { value: 'OBSCENITY', text: 'Obscenity'}
]

let arrest_made_options = [
    { value: 0, text: 'True'},
    { value: 1, text: 'False'}
]

let district_options = [
  { value: 1, text: '1st District - Central' },
  { value: 2, text: '2nd District - Wentworth' },
  { value: 3, text: '3rd District - Grand Crossing' },
  { value: 4, text: '4th District - South Chicago' },
  { value: 5, text: '5th District - Calumet' },
  { value: 6, text: '6th District - Gresham' },
  { value: 7, text: '7th District - Englewood' },
  { value: 8, text: '8th District - Chicago Lawn' },
  { value: 9, text: '9th District - Deering' },
  { value: 10, text: '10th District - Ogden' },
  { value: 11, text: '11th District - Harrison' },
  { value: 12, text: '12th District - Near West' },
  { value: 14, text: '14th District - Shakespeare' },
  { value: 15, text: '15th District - Austin' },
  { value: 16, text: '16th District - Jefferson Park' },
  { value: 17, text: '17th District - Albany Park' },
  { value: 18, text: '18th District - Near North' },
  { value: 19, text: '19th District - Town Hall' },
  { value: 20, text: '20th District - Morgan Park' },
  { value: 24, text: '24th District - Rogers Park' },
  { value: 25, text: '25th District - Grand Central' },
]

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
    this.openSearchFilters = this.openSearchFilters.bind(this)
    this.closeSearchFilters = this.closeSearchFilters.bind(this)
    this.handleCaseChange = this.handleCaseChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleArrestChange = this.handleArrestChange.bind(this)
    this.handleFbiChange = this.handleFbiChange.bind(this)
    this.handleDistrictChange = this.handleDistrictChange.bind(this)
    this.handleStreetChange = this.handleStreetChange.bind(this)
    this.ogsearch = this.ogsearch.bind(this)
    // case number, description, type, fbi code, time range, arrest made and district id
    this.state = {
      search_query : "",
      results : [],
      selectedItem : false,
      selectedID : -1,
      searchModalOpen : false,
      case_number : "",
      description : "",
      type : "",
      fbi_code : "",
      arrest_made : false, 
      district : null,
      street_name : ""
    }
    if(this.props.fbi_code) {
      fbicode = this.props.fbi_code
    }
    // this.props.fbi_code must be attached with every request
  }

  handleCaseChange(event) {
    console.log(event.target.value)
    this.setState({case_number : event.target.value});
  }

  handleTypeChange(event) {
    console.log(event.target.value)
    this.setState({type : event.target.value});
  }

  handleDescriptionChange(event) {
    console.log(event.target.value)
    this.setState({description : event.target.value});
  }

  handleArrestChange(event) {
    let bo = false
    if(event.target.value === "true") {
      bo = true
    }
    else {
      bo = false
    }
    this.setState({arrest_made : bo });
  }

  handleFbiChange(event) {
    console.log(event.target.value)
    this.setState({fbi_code : event.target.value});
  }

  handleDistrictChange(event) {
    this.setState({district : event.target.value});
  }

  handleStreetChange(event) {
    this.setState({street_name : event.target.value});
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
        this.ogsearch()
        console.log(this.state.search_query)
      })
    }
  }

  openSearchFilters() {
    this.setState({
      searchModalOpen : true
    })
  }

  closeSearchFilters() {
    this.setState({
      searchModalOpen : false
    })
  }

  search(event) {
    var q = JSON.stringify(event.target.value)
    axios.get("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" +  {
      params: {
        query : {"case_number" : this.state.case_number, "description" : this.state.description, "type" : this.state.type, "fbi_code" : this.state.fbi_code, "arrest_made" : this.state.arrest_made, "district_id": this.state.district, "block" : this.state.street_name}
      }
    })
    .then(function (response) {
      this.setState({
        movieList : response.data.results,
        searchQuery : q
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }

  ogsearch() {
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
          <Button id="modal-popup" onClick={this.openSearchFilters}> Search Options </Button>
        </div>
        <Modal open={this.state.searchModalOpen} onClose={this.closeSearchFilters}>
          <Header content={"Advanced Search Options"} />
          <Modal.Content>
          <List horizontal link inverted>
            </List>
            <h2></h2>
            <h3>Case Number</h3>
            <Input focus value={this.state.case_number} onChange={this.handleCaseChange}/>
            <h3>Description</h3>
            <Input focus value={this.state.description} onChange={this.handleDescriptionChange}/>
            <h3>Type</h3>
            <Dropdown placeholder='Type' fluid selection options={type_options} onChange = {this.handleTypeChange}/>
            <h3>Fbi Code</h3>
            <Input focus value={this.state.fbi_code} onChange={this.handleFbiChange}/>
            <h3>Arrest Made</h3>
             <Dropdown placeholder='Arrest' fluid selection options={arrest_made_options} onChange = {this.handleArrestChange}/>
            <h3>District ID</h3>
            <Dropdown placeholder='District' fluid selection options={district_options} onChange = {this.handleDistrictChange}/>
            <h3>Street Name</h3>
            <Input focus value={this.state.street_name} onChange={this.handleStreetChange}/>
            <List selection divided inverted relaxed id="movieList">
            </List>
          </Modal.Content>
          <Modal.Actions>
            <Button secondary content='Search' onClick={this.closeSearchFilters} />
          </Modal.Actions>
        </Modal>
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
