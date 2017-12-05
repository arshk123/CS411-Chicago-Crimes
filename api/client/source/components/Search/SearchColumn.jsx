/*
  This Component maintains the search column to the left of the Search Home Page
  Will have a searchBar Component to the top of the column, followed by an empty scrollable list view
*/

import React, { Component } from 'react'
import { Button, List, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styles from './Search.scss'

// Components
import MovieCell from './DataCell/Cell.jsx'

// API
// import {search} from '../api/api.jsx'
import axios from 'axios';

class SearchColumn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      description : '',
      type : '',
      fbi_code : '',
      arrest_made : false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleArrestChange = this.handleArrestChange.bind(this);
    this.handleFbiChange = this.handleFbiChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.search = this.search.bind(this);
    this.populateDetailView = this.populateDetailView.bind(this);
    this.createListElement = this.createListElement.bind(this);
    this.insert = this.insert.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({value : event.target.value});
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


  insert() {

    axios.post("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/",
      {
      	"description" : this.state.description,
      	"type" : this.state.type,
      	"fbi_code" : this.state.fbi_code,
      	"arrest_made" : this.state.arrest_made,
      })
    .then(function (response) {
      console.log(JSON.stringify(response))
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    });
  }

  remove() {
    var q = this.state.value
    axios.delete("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q,
      {
      	"crime_id" : "123389128",
      	"case_number" : "123456",
      	"description" : "Not a crime",
      	"type" : "BATTERY",
      	"fbi_code" : "fa17",
      	"arrest_made" : true,
      	"district_id" : 9,
      	"police_id" : 23,
      	"latitude" : 34.44,
      	"longitude" : 34.44,
      	"ward" : 3,
      	"beat" : 2,
      	"block" : "sixty-six"
      })
    .then(function (response) {
      console.log(JSON.stringify(response))
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    });
  }

  update() {
    var q = this.state.value
    console.log("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q)
    axios.put("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q,
    {
      "description" : this.state.description,
      "type" : this.state.type,
      "fbi_code" : this.state.fbi_code,
      "arrest_made" : this.state.arrest_made,
    })
    .then(function (response) {
      console.log(JSON.stringify(response))
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    });
  }


  populateDetailView() {

  }

  createListElement(data) {

  }

  search(event) {
    var q = this.state.type
    console.log("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q)
    axios.get("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q)
    .then(function (response) {
      console.log(JSON.stringify(response))
      // this.setState({
      //
      // })
    }.bind(this))
    .catch(function (error) {
      console.log(error)
    });
  }


  render() {

    return(
      <div id="SearchColumn">
        <List horizontal link inverted>
          <List.Item as="a" onClick={() => this.insert()}>
            Insert
          </List.Item>
          <List.Item as="a" onClick={() => this.remove()}>
            Remove
          </List.Item>
          <List.Item as="a" onClick={() => this.update()}>
            Update
          </List.Item>
          <List.Item as="a" onClick={() => this.search()}>
            Search
          </List.Item>
        </List>
        <h2></h2>
        <h3>ID</h3>
        <Input focus value={this.state.value} onChange={this.handleChange}/>
        <h3>fbi_code</h3>
        <Input focus value={this.state.fbi_code} onChange={this.handleFbiChange}/>
        <h3>description</h3>
        <Input focus value={this.state.description} onChange={this.handleDescriptionChange}/>
        <h3>type</h3>
        <Input focus value={this.state.type} onChange={this.handleTypeChange}/>
        <h3>arrest_made</h3>
        <Input focus value={this.state.arrest} onChange={this.handleArrestChange}/>
        <List selection divided inverted relaxed id="movieList">
        </List>
      </div>
    )
  }
}

export default SearchColumn
