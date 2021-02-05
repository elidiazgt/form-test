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
      response: ""
    };
  }

  onSubmit(e) {
    e.preventDefault();

    console.log("onSubmit", e);
    let inputs = e.target.elements;
    console.log("formFirstText1", inputs);
    let _this = this;
    for (let index = 0; index < inputs.length - 1; ++index) {
      console.log("value ->", inputs[index].value);
      getText(inputs[index].value);
    }

    //   this.setState({ response: "" });
    function getText(param) {
      console.log("param", param);
      let result;
      let api = 'localhost:8000';
      
      axios
        .get(api+"/iecho", {
          params: {
            text: param
          }
        })
        .then(function(response) {
          // handle success
          //result =
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
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
              Reverted Text
              <div id="reverted_text"></div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
