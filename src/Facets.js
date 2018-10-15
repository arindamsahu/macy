import React, { Component } from 'react';
import {Container, Row, Col, Label, Input} from 'reactstrap';
import './App.css';

class Facets extends Component {

  constructor(props){
    super(props);
    this.state = {size: "", color:"", qty:"1"};
    this.qtyUpdate = this.qtyUpdate.bind(this);
    this.colorUpdate = this.colorUpdate.bind(this);
    this.sizeUpdate = this.sizeUpdate.bind(this);
    this.createColorPalette = this.createColorPalette.bind(this);
    this.props.handleClick(this.state);
  }

  qtyUpdate(e){
    this.setState({qty: e.target.value}, () => {
      this.props.handleClick(this.state);
    });
  }

  colorUpdate(e){
    this.setState({color: e.target.value}, () => {
      this.props.handleClick(this.state);
    });
  }

  sizeUpdate(e){
    this.setState({size: e.target.textContent}, () => {
      this.props.handleClick(this.state);
    });
  }

  createColorPalette(){
    let palette=[];
    if(Object.keys(this.props.passDownData).length !== 0){
      for (var i = this.props.passDownData.color.length - 1; i >= 0; i--) {
        let bgColor = this.props.passDownData.color[i];
        palette.push(<Col><Input type="radio" name="rgrp" id={i} value={this.props.passDownData.color[i]} onChange={this.colorUpdate}/>
          <Label className="colorSchema" style={{backgroundColor:bgColor}} for={i} checked={true}/>
          </Col>);
        }
      }
      return palette;
    }

    render() {
      return (
      <Container>
      <Row className="color">
      <Col>
      Color
      </Col>
      {this.createColorPalette()}
      </Row>
      <Row className="size">
      <Col>
      Size
      </Col>
      <Col>
      <div tabIndex="-1" className="sizeSchema" onClick={this.sizeUpdate}>36S</div>
      </Col>
      <Col>
      <div tabIndex="-1" className="sizeSchema" onClick={this.sizeUpdate}>37S</div>
      </Col>
      <Col>
      <div tabIndex="-1" className="sizeSchema" onClick={this.sizeUpdate}>38R</div>
      </Col>
      <Col>
      <div tabIndex="-1" className="sizeSchema" onClick={this.sizeUpdate}>40L</div>
      </Col>
      <Col>
      <div tabIndex="-1" className="sizeSchema" onClick={this.sizeUpdate}>40R</div>
      </Col>
      </Row>  
      <Row className="qty">
      <Col xs="2">
      Quantity
      </Col>
      <Col xs="3">
      <div className="qtySchema">

      <Input type="select" id="qty" onChange={this.qtyUpdate}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </Input>
      </div>
      </Col>
      </Row>
      </Container>
      );
    }
  }

  export default Facets;
