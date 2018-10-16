import React, { Component } from 'react';
import './App.css';
import loader from './loader.gif';
import Facets from './Facets';
import Address from './Address';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Row, Col, Container, Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {modal: false, facets:{}, shipping:{}, details:{}};
    this.toggle = this.toggle.bind(this);
  }

    componentDidMount(){
    fetch("https://api.myjson.com/bins/tgtoo")
    .then(response => response.json())
    .then(data => this.setState({details: data}));
  }

  handleFacets(facets){
    this.setState({facets: facets});
  }
   handleAddress(shipping){
    this.setState({shipping: shipping});
    this.toggle();

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  loadImage(){
    if(this.state.details.product_img != undefined)
     return <img src={this.state.details.product_img} alt = {this.state.details.product_name}/>
   else
    return <img src={loader} alt = {this.state.details.product_name}/>
  }

  render() {
    return (
       <Router>
       <Container>
      <div className="app">
      <Row>
      <Col>
        <div className="image">
          {this.loadImage()}
        </div>
        </Col>
        <Col>
        <div className="details"> 
          <h3>{this.state.details.product_name}</h3>
        
          <Facets handleClick={this.handleFacets.bind(this)} passDownData={this.state.details}/>
          <Link to="/address"><Button color="info">Next</Button></Link>

          <hr/>
          
          <Route path="/address" render={(props) => <Address {...props} handleAddress={this.handleAddress.bind(this)}/>}/>
        </div>
        </Col>

        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}> Product Summary</ModalHeader>
          <ModalBody>
            Color: {this.state.facets.color} <br/>
            Size: {this.state.facets.size} <br/>
            Quantity: {this.state.facets.qty} <br/><hr/>
            <h6>Shipping Address</h6>
            {this.state.shipping.address1} , 
            {this.state.shipping.address2} ,
            {this.state.shipping.city} ,
            {this.state.shipping.state} ,
            {this.state.shipping.zip} <br/>
          </ModalBody>
          <ModalFooter>
            <Link to="/"><Button color="primary" onClick={this.toggle}>OK</Button></Link>
          </ModalFooter>
        </Modal>
        </Row>
      </div>
      </Container>
    </Router>
    );
  }
}

export default App;
