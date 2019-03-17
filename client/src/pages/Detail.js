import React, { Component } from "react";
import API from "../utils/API";
// import { Label, FormGroup, Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import axios from "axios";

// import { isDate } from "util";
const moment = require('moment');

class Detail extends Component {
  state = {
    story : []
  }

  componentDidMount() {
    API.getStory(this.props.match.params.id)
      .then(res => this.setState({ story: res.data }))
      .catch(err => console.log(err));
  }

    render() {
    return(
      <Container fluid>
      <Row>
        <Col size="md-12">
        <div className="story-wrapper card mb-3">
          <div id="story-container">
          <div className="back-button mb-3"><i class="fas fa-arrow-left"></i> Go Back</div>
          <div className="profile-pic-feed" style={{backgroundColor: this.state.story.color}}><i className={this.state.story.icon}></i></div>
          <h1>{this.state.story.title}</h1>
          <p className="author-attr">created {moment(this.state.story.date).fromNow()} by {this.state.story.author}</p>
          <p className="story-summary">{this.state.story.content}</p>
          <div className="audio-container justify-content-center d-flex mt-4 mb-5">
            <audio controls src={"data:audio/mp3;base64," + this.state.story.base64}></audio>
          </div>
          
          
          </div>

        </div>
        </Col>
      </Row>
    </Container>
    )
    }
}

export default Detail;