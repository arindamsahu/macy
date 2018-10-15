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
    this.createSizePalette = this.createSizePalette.bind(this);
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
    this.setState({size: e.target.value}, () => {
      this.props.handleClick(this.state);
    });
  }

  createColorPalette(){
    let palette=[];
    if(Object.keys(this.props.passDownData).length !== 0){
      for (var i = 0; i < this.props.passDownData.color.length; i++) {
        let bgColor = this.props.passDownData.color[i];
        palette.push(<Col><Input type="radio" name="rgrp" id={i} value={this.props.passDownData.color[i]} onChange={this.colorUpdate} defaultChecked={true}/>
          <Label className="colorSchema" style={{backgroundColor:bgColor}} for={i}/></Col>);
        }
      }
      return palette;
    }

    createSizePalette(){
          let palette=[];
    if(Object.keys(this.props.passDownData).length !== 0){
      for (var i = 0; i < this.props.passDownData.size.length; i++) {
        palette.push(<Col><Input type="radio" name="sgrp" id={this.props.passDownData.size[i]} value={this.props.passDownData.size[i]} onChange={this.sizeUpdate} defaultChecked={true}/>
          <Label className="sizeSchema" for={this.props.passDownData.size[i]}>{this.props.passDownData.size[i]}</Label>
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
      {this.createSizePalette()}
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
