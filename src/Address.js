  import React, { Component } from 'react';
  import {Row, Col, Label, Input, Form, Button} from 'reactstrap';
  import './App.css';

  class Address extends Component {

    constructor(props){
      super(props);
      this.state = {address1: "", address2:"", city:"", state:"", zip:""};
      this.onFinish = this.onFinish.bind(this);

    }

    onFinish(e){
      e.preventDefault();
      let flag = this.validate(e);
      if(flag){
      this.setState({
        address1:e.target.elements.address1.value,
        address2:e.target.elements.address2.value,
        city:e.target.elements.city.value,
        state:e.target.elements.state.value,
        zip:e.target.elements.zip.value
      }, () => {
        this.props.handleAddress(this.state);
      });
    }
    else{
      document.getElementById("error").innerHTML  = "Please fill up the mandatory fields";
    }
    }

    validate(e){
      let flag = true;
      if(e.target.elements.address1.value === '' || e.target.elements.city.value === '' ||
        e.target.elements.state.value === '' || e.target.elements.zip.value === ''){
        flag = false;
      }
      return flag;
    }

    render() {
      return (
        <div className="address">
        <h6>Shipping Address</h6><br/>
        <Form onSubmit={this.onFinish}>
        <Row>
             <Col> <Label for="address1">Address 1*:</Label></Col>
        <Col>
            <Input type="text" name="address1" id="address1" placeholder="with a placeholder" />
        </Col>

        </Row>

                <Row>

         <Col> <Label for="address2">Address 2:</Label></Col>
        <Col>
            <Input type="text" name="address2" id="address2" placeholder="with a placeholder" />
        </Col>

          </Row>
                  <Row>

          <Col><Label for="city">City*:</Label></Col>
        <Col>
            <Input type="text" name="city" id="city" placeholder="with a placeholder" />
        </Col>

          </Row>
                  <Row>

          <Col><Label for="State">State*:</Label></Col>
        <Col>
            <Input type="text" name="state" id="state" placeholder="with a placeholder" />
        </Col>

          </Row>
                  <Row>
    <Col><Label for="zip">Zip*: </Label></Col>
        <Col>
            <Input type="text" name="zip" id="zip" placeholder="with a placeholder" />
        </Col>
        </Row>

        <Button color="success">Finish</Button>
        <Row><Label id="error"></Label></Row>
        </Form>
        </div>
        );
      }
    }

    export default Address;
