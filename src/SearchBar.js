import React from 'react';
import Navbar from 'react-bootstrap/NavBar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Autosuggest from 'react-autosuggest'
import { debounce } from 'throttle-debounce'
import btoa from 'btoa'
import './SearchBar.css'
import logo from './logo.png';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'

class SearchBar extends React.Component {
    state = {
        value: '',
        suggestions: [],
        showInstructions: false
    }
    componentDidMount() {
        this.setState({ value: this.props.value })
        this.onSuggestionsFetchRequested = debounce(
          200,
          this.onSuggestionsFetchRequested
        )
      }

      renderSuggestion = suggestion => {
        return (
          <div className="result">
            <div className="thingName">{suggestion.name}</div>
            <div className="shortCode">{
                suggestion.type == 'MusicGroup' ? 'Artist'
                : suggestion.type == 'MusicAlbum' ? 'Album'
                : suggestion.type == 'Place' ? 'Venue'
                : 'Label'
            }</div>
          </div>
        )
      }

      onChange = (event, { newValue }) => {
        this.setState({ value: newValue })
      }

      onSuggestionsFetchRequested = ({ value }) => {
        fetch('https://gimli-eu-west-1.searchly.com/xsilence/_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(process.env.REACT_APP_ELK_API_USER+':'+process.env.REACT_APP_ELK_API_PASSWORD)
            },
            body: JSON.stringify({
                query: {
                  match: {
                    name: value
                  }
                },
                sort: ['_score']
            }),
        }).then(response => response.json())
          .then(response => {
            const results = response.hits.hits.map(h => h._source)
            this.setState({ suggestions: results })
        })
      }

      onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] })
      }

      renderCustomInput = inputProps => (
          <input
              className="form-control mr-sm-2"
              type="search"
              {...inputProps}
              onKeyUp={(e) => this.disableEnter(e)} />
      );

      disableEnter = (event) => {
       if (event.keyCode === 13) {
           event.preventDefault();
       }
     }
     setShowInstructions = () => {
         this.setState({
             showInstructions: !this.state.showInstructions
         })
     }

    render () {
        const { value, suggestions } = this.state

        const inputProps = {
            placeholder: 'Search...',
            value,
            onChange: this.onChange
        }

        return(
          <Navbar fixed="top" className="Navbar d-flex">
            <Navbar.Brand id="logo" href="#home">
              <img
                src={ logo }
                width="60px"
                height="60px"
                className="d-inline-block align-top"
                alt="Noisedge logo"
              />
            </Navbar.Brand>
            <Form id="form-container" inline className="mx-1 flex-fill" onSubmit={this.props.onSubmit}>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={suggestion => suggestion.name}
                  renderSuggestion={this.renderSuggestion}
                  onSuggestionSelected={(event, { suggestion }) => this.props.handleSearch(suggestion)}
                  onSuggestionHighlighted={(suggestion) => {this.props.onSuggestionHighlighted(suggestion)}}
                  inputProps={inputProps}
                  renderInputComponent={this.renderCustomInput}
                />
            </Form>
            <Modal
                id="instructions"
                size="lg"
                show={this.state.showInstructions}
                onHide={() => this.setShowInstructions(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Welcome to Noisedge!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li>Search for artists, albums, labels or showrooms using the search bar</li>
                    <li>Click on nodes to expand them</li>
                    <li>Once a node is clicked, display related info by clicking on the INFO button</li>
                </ul>
            </Modal.Body>
          </Modal>
            <Row className="mr-1">
                <i id="help-icon" className="far fa-question-circle fa-2x" onClick={() => this.setShowInstructions()}></i>
                <Button
                    className="mx-1"
                    disabled={!this.props.buttonVisible}
                    variant="outline-light"
                    onClick={this.props.onButtonClick}>INFO
                </Button>
            </Row>
          </Navbar>
        )
    };
}

export default SearchBar;
