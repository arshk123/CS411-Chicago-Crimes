import { Link } from 'react-router-dom'
import React, { Component } from 'react'


class Item extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Item';
        this.state = {
            hover: false
        };
    }
    mouseOver() {
        this.setState({hover: true});

    }
    mouseOut() {
        this.setState({hover: false});
    }
    render() {
      const { item, i } = this.props;

            if(this.state.hover == true)
            {
              return (
              <div id="parent-element">
                <div id="child-element">{this.props.data}</div>
                <img src = {logo2} width = "50px" height = "50px" />
              </div>

              );
            }
            else
            {
              return (
              <div ><img src = {logo2} width = "50px" height = "50px" /></div>
              );
            }

    }
}


export default Item;
