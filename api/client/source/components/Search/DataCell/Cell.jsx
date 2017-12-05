/*
  represents a single instance of a search result
*/
import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styles from './Cell.scss'
import PropTypes from 'prop-types';


/*
  Each Movie Cell refers to a listitem in the list view
  Takes in  props {
    header: title
    subheader: rank
    backdrop: link in api for movie image
  }
*/
class CrimeCell extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <List.Item onClick={() => this.props.selectionTrigger(this.props.id)}>
        <List.Content>
          <List.Header>{this.props.header}</List.Header>
          {this.props.subheader}
        </List.Content>
      </List.Item>
    )
  }
}

CrimeCell.propTypes = {
  name : PropTypes.string,
  header : PropTypes.string,
  id : PropTypes.number,
  selectionTrigger : PropTypes.func
}

export default CrimeCell
