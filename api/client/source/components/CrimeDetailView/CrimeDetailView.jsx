/*
  Will render song details in right side of page.
*/
import React, { Component } from 'react'
import { List, Image, Modal, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

/*
  Each detailView refers to a listitem in the list view
  Takes in  props {
    header: title
    subheader: rank
    backdrop: link in api for movie image
  }
*/
class CrimeDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: true,
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  handleClose() {
    this.setState({ modalOpen: false }, ()=>this.props.clearSelection())
  }

  render() {
    // console.log(JSON.stringify(this.props.mSelected))
    // https://stackoverflow.com/questions/33846682/react-onclick-function-fires-on-render
    if(this.props.mSelected) {
      return(
        <Modal open={this.state.modalOpen} onClose={this.handleClose}>
          <Header content={"Hey"} />
          <Modal.Content>
            <div id="detailView">
              This is a test popup. also please work.
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button secondary content='Close' onClick={this.handleClose} />
          </Modal.Actions>
        </Modal>
      )
    }
    else {
      return(
        <div id="detailView"></div>
      )
    }
  }
}

CrimeDetailView.propTypes = {
  description : PropTypes.string,
  mSelected : PropTypes.bool,
  clearSelection : PropTypes.func
}


export default CrimeDetailView
