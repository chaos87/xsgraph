import React from "react";
import { slide as Menu } from 'react-burger-menu'
import './SideBar.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


class SideBar extends React.Component {
  constructor(props) {
    super(props)

    const sizeBigMQL = window.matchMedia('(min-width: 1039px)')
    const sizeMediumMQL = window.matchMedia('(min-width: 839px)')

    this.state = {
      sizeIsBig: sizeBigMQL.matches,
      sizeIsMedium: sizeMediumMQL.matches
    }

    sizeBigMQL.onchange = e => {
      this.setState({
        sizeIsBig: e.matches
      })
    }
    sizeMediumMQL.onchange = e => {
      this.setState({
        sizeIsMedium: e.matches
      })
    }
  }

  render() {
      return (
        <Menu
            right customBurgerIcon={ false }
            isOpen={this.props.isOpen}
            onStateChange={(e) => this.props.offCanvasOpen(e)}
            width={ this.state.sizeIsBig ? '30%': this.state.sizeIsMedium ? '60%': '100%' }
        >
        <Container>
          <Container className="my-5">
              <Col className="my-5">
              {this.props.data != null
                  && <h2>{this.props.data.label}</h2>}
              </Col>
              <Col>
                  {this.props.data != null
                      && !this.props.data.image.includes("flaticon.com")
                      && <img src={this.props.data.image}></img>}
              </Col>
          </Container>

          <Container className="my-5">
              <Col>
                  {this.props.data != null
                      && this.props.data.type == 'album'
                      && <p><b>Released:</b> {this.props.data.datePublished}</p>}
              </Col>
              <Col>
                  {this.props.data != null
                      && this.props.data.type == 'concert'
                      && <p><b>Date:</b> {this.props.data.eventDate}</p>}
              </Col>
              <Col>
              {this.props.data != null
                  && this.props.data.type != 'artist'
                  && <p><b>Average:</b> {this.props.data.average}</p>}
              </Col>
              <Col>
              {this.props.data != null
                  && this.props.data.type == 'artist'
                  && <p><b>Description:</b> {this.props.data.description}</p>}
              </Col>
          </Container>
              <Container className="my-5">
                  <Row className="mx-0">
                      <Col>
                      {this.props.data != null
                          && <a href={this.props.data.id} target="_blank">Xsilence</a>}
                  </Col>
                      <Col>
                      {this.props.data != null
                          && this.props.data.type == 'artist'
                          && <a href={this.props.data.url} target="_blank">Fanpage</a>}
                  </Col>
              </Row>
            </Container>
        </Container>
        </Menu>
      );
    };
};

export default SideBar;
