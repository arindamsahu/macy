import React, { Component } from 'react';
import './App.css';
import Facets from './Facets';
import Address from './Address';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {modal: false, facets:{}, shipping:{}, details:{}};
    this.toggle = this.toggle.bind(this);
  }

    componentDidMount(){
    fetch("https://api.myjson.com/bins/e0thc")
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

  render() {
    return (
       <Router>
      <div className="App">
        <div className="image">
          <img src={this.state.details.product_img} alt = {this.state.details.product_name}/>
        </div>
        <div className="details"> 
          <h3>{this.state.details.product_name}</h3>
        
          <Facets handleClick={this.handleFacets.bind(this)} passDownData={this.state.details}/>
          <Link to="/address"><Button color="info">Next</Button></Link>

          <hr/>
          
          <Route path="/address" render={(props) => <Address {...props} handleAddress={this.handleAddress.bind(this)}/>}/>
        </div>

        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}> Product Summary</ModalHeader>
          <ModalBody>
            Color: {this.state.facets.color} <br/>
            Size: {this.state.facets.size} <br/>
            Quantity: {this.state.facets.qty} <br/><hr/>
            <h6>Shipping Address</h6>
            Address 1: {this.state.shipping.address1} <br/>
            Address 2: {this.state.shipping.address2} <br/>
            City: {this.state.shipping.city} <br/>
            State: {this.state.shipping.state} <br/>
            Zip: {this.state.shipping.zip} <br/>
          </ModalBody>
          <ModalFooter>
            <Link to="/"><Button color="primary" onClick={this.toggle}>OK</Button></Link>
          </ModalFooter>
        </Modal>
      </div>
    </Router>
    );
  }
}

export default App;
