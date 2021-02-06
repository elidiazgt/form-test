import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./style.scss";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show_text: false,
      final_text: []
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let _this = this;
    let inputs = e.target.elements;
    this.state.final_text = []
    this.state.show_text = false

    for (let index = 0; index < inputs.length - 1; ++index) {
      getText(inputs[index].value,_this)
    }

      function getText (param,_this) {
      let result;
      let api = 'http://localhost:8000';
      
      axios
        .get(api+"/iecho", {
          params: {
            text: param
          }
        })
        .then(function(response) {
          // handle success
          result = response.data         
           let text = _this.state.final_text
           text.push(result)
           _this.setState({
             show_text: true,
             text
           });
        })
        .catch(function(error) {
          // handle error
          console.log('error',error);
        })
      return result;
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="danger" expand="lg">
          <Navbar.Brand href="#home">Api test</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formFirstText">
                  <Form.Label>Revert first text</Form.Label>
                  <Form.Control
                    type="text"
                    ref="formFirstText"
                    placeholder="Enter text"
                  />
                </Form.Group>

                <Form.Group controlId="formSecondText">
                  <Form.Label>Revert secont text</Form.Label>
                  <Form.Control
                    type="text"
                    ref="formSecondText"
                    placeholder="Enter text"
                  />
                </Form.Group>

                <Form.Group controlId="formThirdText">
                  <Form.Label>Revert Third text</Form.Label>
                  <Form.Control
                    type="text"
                    ref="formThirdText"
                    placeholder="Enter text"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Reverted Text</h3>
              <div >
                 {this.state.show_text ? this.state.final_text.reverse().map((subItems, sIndex) => {
                     return <li key={sIndex}> {subItems}</li>
                 }) : '' }
             </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
