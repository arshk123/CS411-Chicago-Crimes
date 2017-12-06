import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchColumn from '../Search/SearchColumn.jsx'
import { Button, Input, List, Modal, Header, Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import styles from './Home.scss'

import CrimeCell from '../Search/DataCell/Cell.jsx'
import Map from '../Map/Map.jsx'
import CrimeDetailView from '../CrimeDetailView/CrimeDetailView.jsx'

let const_opts = {
	"id": 0,
	"crime_id": 0,
	"case_number": "",
	"description": "N/A",
	"time": "0",
	"type": "",
	"fbi_code": "0",
	"arrest_made": false,
	"district_id": 0,
	"police_id": 0,
	"latitude": 0,
	"longitude": 0,
	"ward": 0,
	"beat": 0,
	"block": "",
	"crime_index": 0
}

let type_options = [
	{ value: '', text: 'Search'},
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
class Home extends Component {

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
		this.handleDetailModalOpen = this.handleDetailModalOpen.bind(this)
		this.handleDetailModalClose = this.handleDetailModalClose.bind(this)
		this.edit = this.edit.bind(this)
		this.remove = this.remove.bind(this)
		this.openInsertionModal = this.openInsertionModal.bind(this)
		this.cancelInsertModal = this.cancelInsertModal.bind(this)
		this.closeInsertModalWithInsert = this.closeInsertModalWithInsert.bind(this)
		this.openEdit = this.openEdit.bind(this)
		this.closeEditModal = this.closeEditModal.bind(this)
		this.closeEditModalWithUpdate = this.closeEditModalWithUpdate.bind(this)
		this.handleLatChange = this.handleLatChange.bind(this)
		this.handleLngChange = this.handleLngChange.bind(this)
		this.handleWardChange = this.handleWardChange.bind(this)
		this.handleBeatChange = this.handleBeatChange.bind(this)
		this.handleBlockChange = this.handleBlockChange.bind(this)
		this.handlePoliceChange = this.handlePoliceChange.bind(this)
		this.state = {
			search_query : "",
			results : [],
			selectedItem : false,
			selectedID : -1,
			searchModalOpen : false,
			detailModalOpen : false,
			case_number : "",
			description : "",
			type : "",
			fbi_code : "",
			arrest_made : null,
			district_id : null,
			selectedData : const_opts,
			openEditmodal : false,

			latitude :null,
			longitude:null,
			ward :null,
			beat:null,
			block:null,
			police_id:null,
			insertionModalOpen : false,
			selectedPoliceOfficer : "",
			selectedBeatMinMax : "",
			selectedDistrictMinMax : ""

		}
		// selectedPoliceOfficer : response.data.rows["police_name"],
		// selectedBeatMinMax : response.data.rows["beat_minmax"],
		// districtMinMax : response.data.rows["district_minmax"]
		// this.props.fbi_code must be attached with every request
		this.ogsearch()
	}

	openEdit() {
		this.setState({
			openEditModal : true,
			searchModalOpen : false
		})
	}

	closeEditModal() {
		this.setState({
			openEditModal : false
		})
	}

	closeEditModalWithUpdate() {
		// All data is in this.state.selectedData
		var des = null
		var type = null
		var fbi = null
		var arrest = null
		if(this.state.description == "")
		{
			des = this.state.selectedData['description']
		}
		else
		{
			des = this.state.description
		}

		if(this.state.type == "")
		{
			type = this.state.selectedData['type']
		}
		else
		{
			type = this.state.type
		}

		if(this.state.fbi_code == "")
		{
			fbi = this.state.selectedData['fbi_code']
		}
		else
		{
			fbi = this.state.fbi_code
		}

		if(this.state.arrest_made == null)
		{
			arrest = this.state.selectedData['arrest_made']
		}
		else
		{
			arrest = this.state.arrest_made
		}
		console.log(this.state.selectedData.id)
		let data = {"description":des,
			"type":type,
			"fbi_code":fbi,
			"arrest_made" : arrest,
			"id" : this.state.selectedData.id
		}
		var headers = {
			"contentType" : "application/json"
		}
		console.log(this.state)
		var q = this.state.selectedID
		axios.put("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q, data, headers)
		.then(function (response) {
			this.setState({
				description : "",
				type : "",
				fbi_code : "",
				arrest_made : null,
			},
			this.closeEditModal(),
			this.ogsearch())
		}.bind(this))
		.catch(function (error) {
			console.log(error)

		})
	}

	handleDetailModalOpen(data){
		// selectedItem : data
		// this.state.selectedPoliceOfficer
		let params = {
			"id" : data["id"]
		}
		var headers = {
			"contentType" : "application/json"
		}
		console.log(data)
		let q = data["id"]
		console.log(q)
		axios.get("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q)
		.then(function (response) {
			console.log(JSON.stringify(response))
			this.setState({
				selectedPoliceOfficer : response.data.data.rows[0]["police_name"],
				selectedBeatMinMax : response.data.data.rows[0]["beat_minmax"],
				selectedDistrictMinMax : response.data.data.rows[0]["district_minmax"],
				detailModalOpen : true,
				selectedItem : true,
				selectedID : data["crime_id"],
				selectedData : data
			},() => {
				this.render()
			})
		}.bind(this))
		.catch(function (error) {
			console.log(error)
		});
	}

	handleDetailModalClose(){
		// axios.get("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q)
		// .then(function (response) {
		//   console.log(JSON.stringify(response))
		//   this.setState({
		//   	selectedPoliceOfficer : response.data
		//   })
		// }.bind(this))
		// .catch(function (error) {
		//   console.log(error)
		// });
		this.setState({
			detailModalOpen : false,
			selectedItem : false,
			selectedID : -1,
			selectedData : const_opts
		})
	}

	handleCaseChange(event) {
		console.log(event.target.value)
		this.setState({case_number : event.target.value});
	}

	handleTypeChange(event, data : any) {
		console.log(data.value)
		this.setState({type : data.value});
	}

	handleDescriptionChange(event) {
		console.log(event.target.value)
		this.setState({description : event.target.value});
	}

	handleArrestChange(event, data : any) {
		console.log(data.value)
		let bo = false
		if(data.value === "True") {
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

	handleDistrictChange(event, data : any) {
		console.log(data.value)
		this.setState({district_id : data.value});
	}

	handleStreetChange(event) {
		this.setState({street_name : event.target.value});
	}

	handleLatChange(event)
	{
		this.setState({latitude : event.target.value})
	}

	handleLngChange(event)
	{
		this.setState({longitude : event.target.value})
	}

	handleWardChange(event)
	{
		this.setState({ward : event.target.value})
	}

	handleBlockChange(event)
	{
		this.setState({block : event.target.value})
	}

	handleBeatChange(event)
	{
		this.setState({beat : event.target.value})
	}

	handlePoliceChange(event)
	{
		this.setState({police_id:event.target.value})
	}

	selectedItem(data) {
		console.log(id)
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
				selectionTrigger={() => {this.handleDetailModalOpen(data)}}
				id={data["crime_id"]}
				data={data}
				/>
		)
	}

	handleChange(event) {
		if(event.target.value === "") {
			this.setState({
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

	handleOuterTypeChange(event, data : any) {
		if(data.value === "") {
			this.setState({
				search_query : data.value
			}, () => {
				// query search
				this.ogsearch()
				console.log(this.state.search_query)
			})
		}
		else {
			this.setState({
				search_query : data.value
			}, () => {
				// query search
				this.ogsearch()
				console.log(this.state.search_query)
			})
		}
	}






	openInsertionModal() {
		this.setState({
			insertionModalOpen : true
		})
	}

	cancelInsertModal() {
		this.setState({
			insertionModalOpen : false
		})
	}



	closeInsertModalWithInsert() {
		let data = {"description":this.state.description,
			"type":this.state.type,
			"fbi_code":this.state.fbi_code,
			"arrest_made" : this.state.arrest_made,
			"case_number" : this.state.case_number,
			"police_id":this.state.police_id,
			"latitude": this.state.latitude,
			"longitude":this.state.longitude,
			"ward":this.state.ward,
			"beat":this.state.beat,
			"block":this.state.block,
			"district_id":this.state.district_id
		}
		var headers = {
			"contentType" : "application/json"
		}
		console.log(this.state)
		axios.post("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes", data, headers)
		.then(function (response) {
			this.setState({
				case_number : "",
				description : "",
				type : "",
				fbi_code : "",
				arrest_made : null,
				district_id : null,
				selectedData : const_opts,
				latitude :0.0,
				longitude:0.0,
				ward :0,
				beat:0,
				block:0,
				insertionModalOpen : false
			})
		}.bind(this))
		.catch(function (error) {
			console.log(error)

		})
	}



	openSearchFilters() {
		this.setState({
			searchModalOpen : true,
			case_number : "",
			description : "",
			type : "",
			fbi_code : "",
			arrest_made : null,
			district_id : null,
			street_name : ""
		})
	}

	closeSearchFilters() {
		this.setState({
			searchModalOpen : false
		},() => {
			this.search()
		})
	}

	search() {
		console.log("searching ")
		axios.get("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes",  {
			params: {"case_number" : this.state.case_number, "description" : this.state.description, "type" : this.state.type, "fbi_code" : this.state.fbi_code, "arrest_made" : this.state.arrest_made, "district_id": this.state.district_id}
		})
		.then(function (response) {
			this.setState({
				results : response.data["data"]["rows"]

			})
		}.bind(this))
		.catch(function (error) {
			console.log(error);
		});
	}

	edit() {

	}

	remove() {
		var q = this.state.selectedData["crime_id"]
		axios.delete("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q, {
			"id" : q
		})
		.then(function (response) {
			console.log(JSON.stringify(response))
			this.handleDetailModalClose()
		}.bind(this))
		.catch(function (error) {
			console.log(error)
		});
	}

	ogsearch() {
		var q = this.state.search_query
		console.log("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes/" + q)
		axios.get("http://fa17-cs411-10.cs.illinois.edu:8280/api/crimes",  {
			params: {"case_number" : "", "description" : "", "type" : this.state.search_query, "fbi_code" : "", "arrest_made" : null, "district_id": null}
		})
		.then(function (response) {
			// console.log(JSON.stringify(response.data["data"]["rows"]))
			this.setState({
				results : response.data["data"]["rows"]
			})
		}.bind(this))
		.catch(function (error) {
			console.log(error)
		});
	}

        getTimeFromString(the_str) {
            var curr = the_str.slice(1, -1);
            curr = curr.split(",");
            curr[0] += ":00"
            curr[1] += ":00"
            curr = "Minimum crime starting hour is " + curr[0] + ", maximum crime starting hour is " + curr[1] + "\n";
            console.log(curr)
            return curr
        }


	render() {
		document.body.classList.add('scrolling', 'dimmable', 'dimmed');
		var listObjects = (this.state.results).map(this.createListElement)

			return (
				<div className="Home">
					<div className="navbar" id="nav">
						<Link to="/">
							<Button color='teal'>
								Logout
							</Button>
						</Link>
					</div>
					<div className="content-container">
						<div className="search">
							{/*<Input focus fluid placeholder="Search" value={this.state.search_query} onChange={this.handleChange}/>*/}
							<Dropdown placeholder='Search by crime type' fluid search selection options={type_options} onChange={this.handleOuterTypeChange.bind(this)}/>
						</div>
						<div className="filter">
							<Button id="modal-popup" inverted color='grey' onClick={this.openSearchFilters}> Search Options </Button>
						</div>
						<div className="modal-div">
							<Modal open={this.state.searchModalOpen} onClose={this.closeSearchFilters}>
								<Header content={"Advanced Search Options"} />
								<Modal.Content>
									<div id="scroll-view">
										<List horizontal link inverted>
										</List>
										<h2></h2>
										<h3>Case Number</h3>
										<Input focus value={this.state.case_number} onChange={this.handleCaseChange}/>
										<h3>Description</h3>
										<Input focus value={this.state.description} onChange={this.handleDescriptionChange}/>
										<h3>Type</h3>
										<Dropdown placeholder='Type' fluid selection options={type_options} onChange={this.handleTypeChange.bind(this)}/>
										<h3>Fbi Code</h3>
										<Input focus value={this.state.fbi_code} onChange={this.handleFbiChange}/>
										<h3>Arrest Made</h3>
										<Dropdown placeholder='Arrest' fluid selection options={arrest_made_options} onChange={this.handleArrestChange.bind(this)}/>
										<h3>District ID</h3>
										<Dropdown placeholder='District' fluid selection options={district_options} onChange={this.handleDistrictChange.bind(this)}/>
										<List selection divided inverted relaxed id="movieList">
										</List>
									</div>
								</Modal.Content>
								<Modal.Actions>
									<Button secondary content='Search' onClick={this.closeSearchFilters} />
								</Modal.Actions>
							</Modal>
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
					<div className="modal-div">
						<Modal open={this.state.detailModalOpen} onClose={this.handleDetailModalClose}>
							<Header content={"Advanced Search Options"} />
							<Modal.Content>
								<List horizontal link inverted> </List>
								<h3>Case Number</h3>
								<h4>{this.state.selectedData["case_number"]}</h4>
								<h3>Description</h3>
								<h4>{this.state.selectedData["description"]}</h4>
								<h3>Time of Crime</h3>
								<h4>{this.state.selectedData["time"]}</h4>
								<h3>Block</h3>
								<h4>{this.state.selectedData["block"]}</h4>
								<h3>Crime Index</h3>
								<h4>{this.state.selectedData["crime_index"]}</h4>
								<h3>Reporting Police Officer</h3>
								<h4>{this.state.selectedPoliceOfficer}</h4>
								<h3>Beat Minimum and Maximum Crime Times (starting hour)</h3>
								<h4>{this.getTimeFromString(this.state.selectedBeatMinMax)}</h4>
								<h3>District Minimum and Maximum Crime Times (starting hour)</h3>
								<h4>{this.getTimeFromString(this.state.selectedDistrictMinMax)}</h4>
								<List selection divided inverted relaxed id="movieList"> </List>
							</Modal.Content>
							<Modal.Actions>
								<Button secondary content='Close' onClick={this.handleDetailModalClose} />
							</Modal.Actions>
						</Modal>
					</div>
				</div>
			)

	}
}

export default Home;
