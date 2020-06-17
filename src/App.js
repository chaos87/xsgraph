import React from 'react';
import './App.css';
import SearchBar from './SearchBar'
import queries from './queries'
import Graph from "react-graph-vis";
import parameterizedString from './helpers'
import cloneDeep from 'lodash/cloneDeep';
import { options, createNode, createEdge } from './graphConfig'
import SideBar from "./SideBar";


const apiURI = "https://xsgraph-api.chaos87.repl.co/graphql"

const doneText = "Click on any node to find related entities. Double click to go to Xsilence."
const loadingText = "Retrieving data. Please wait..."
const alreadyExpandedText = "Node already expanded."

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          searchTerm: "Fugazi",
          tappedNodeData: null,
          instructionText: loadingText,
          graph: {
              nodes: [],
              edges: []
          },
          events: {
            selectNode: (event) => this.handleSelect(event),
            doubleClick: (event) => this.handleDoubleClick(event),
            click: (event) => this.handleClick(event)
        },
        network: null,
        loading: false,
        buttonVisible: false,
        isOffCanvasOpen: false,
        highlightedSuggestion: null,
      };
  }

  updateGraph = (apiURI, type, query, needsLoader) => {
    this.setState({ instructionText: loadingText, loading: needsLoader }, () => {
      fetch(apiURI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query
        }),
      })
        .then(response => {
          return response.json()
        })
        .then(responseAsJson => {
          if (responseAsJson.errors) {
              this.setState({
                loading: false,
                tappedNodeData: null
              })
          } else {
            const data = type == 'artist' ? responseAsJson.data.MusicGroup[0]
            : type == 'album' ? responseAsJson.data.MusicAlbum[0]
            : type == 'concert' ? responseAsJson.data.MusicEvent[0]
            : type == 'label' ? responseAsJson.data.Organization[0]
            : responseAsJson.data.Place[0]
            this.visualise(null, null, data)
            this.setState({
              instructionText: doneText, loading: false
            })
          }
        })
        .catch(error => {
            this.setState({
              loading: false,
              tappedNodeData: null
            })
        })
    })
  }


  visualise(parent, relation, entity) {
      const graph = cloneDeep(this.state.graph)

      if (!graph.nodes.find((e) => e.id === entity._id)) {
          let node = createNode(entity)
          graph.nodes.push(node)
      }

      if (parent != null && relation != null) {
          let edge = createEdge(parent, relation, entity)
          if (!graph.edges.find((e) => e.id === edge.id)) {
              graph.edges.push(edge)
          }
      }
      // Apply graph transformations
      this.setState({ graph });
      for (var property in entity) {
          if (entity[property] != null && typeof entity[property] === 'object' && entity[property].constructor === Object) {
              this.visualise(entity._id, property, entity[property])
          }

          if (entity[property] != null && typeof entity[property] === 'object' && entity[property].constructor === Array) {
              for (let i = 0; i < entity[property].length; i++) {
                  var value = entity[property][i]
                  if (value != null && typeof value === 'object' && value.constructor === Object) {
                      this.visualise(entity._id, property, value)
                  }
              }
          }
      }
  }

  componentDidMount() {
      // start function
      let uri = "http://www.xsilence.net/artiste-62.htm";
      this.updateGraph(apiURI, 'artist', parameterizedString(queries.initArtist, uri), true)
  }

  handleSelect(e) {
      // get related
     const { nodes, edges } = e;
     const graph = cloneDeep(this.state.graph)
     let parentNode = graph.nodes.find((e) => e.id === nodes[0])
     const acceptedTypesForOffCanvas = ["artist", "album", "concert"]
     this.setState({
         tappedNodeData: parentNode,
         buttonVisible: acceptedTypesForOffCanvas.includes(parentNode.type)
     })
     if (!parentNode.expanded) {
         // update node in graph
         const expanded = true;
         const size = 40;
         this.setState({
          graph: {'nodes': graph.nodes.map(el => (el.id === parentNode.id ? {...el, expanded, size} : el)),
                'edges': graph.edges}
        });
        const query = parentNode.type === 'artist' ? queries.getRelatedArtist
                    : parentNode.type === 'album' ? queries.getRelatedAlbum
                    : parentNode.type === 'label' ? queries.getRelatedLabel
                    : parentNode.type === 'location' ? queries.getRelatedLocation
                    : queries.getRelatedConcert;
        this.updateGraph(apiURI, parentNode.type, parameterizedString(query, parentNode.id), false);
     }
     else {
         this.setState({instructionText: alreadyExpandedText})
         setTimeout(function () { this.setState({ instructionText: doneText }) }.bind(this), 1000);
     }
  }

  handleClick(e) {
      const { nodes, edges } = e;
      if (!nodes[0]) {
          this.setState({ buttonVisible: false });
      }
  }

  handleDoubleClick(e) {
      // open xsilence page
      const { nodes, edges } = e;
      if (nodes[0]) {
          window.open(nodes[0]);
      }
  }

  handleSearch = (e) => {
      const type = e.type === 'MusicGroup' ? 'artist'
                 : e.type === 'MusicAlbum' ? 'album'
                 : e.type === 'Organization' ? 'label'
                 : 'location'
      const query = type === 'artist' ? queries.initArtist
                  : type === 'album' ? queries.initAlbum
                  : type === 'label' ? queries.initLabel
                  : queries.initLocation;
      this.setState({searchTerm: e.name, graph: {'nodes': [], 'edges': []}})
      this.updateGraph(apiURI, type, parameterizedString(query, e.id), true);
      let nodes = this.state.graph.nodes.map(a => a.id);
      this.state.network.fit({'nodes': nodes});
  }

  handleButtonClick = () => {
      this.setState(
      { isOffCanvasOpen: true }
    )
  }

  offCanvasOpen = (e) => {
      this.setState(
      { isOffCanvasOpen: e.state }
    )
  }

  handleHighlightedSuggestion = (e) => {
      this.setState(
      { highlightedSuggestion: e }
    )
  }

  onSubmit = (e) => {
      e.preventDefault();
  }

  render () {
    const searchTerm = this.state.searchTerm
    const instructionText = this.state.instructionText
    return(

        <div className="App">
            <SideBar
                isOpen={this.state.isOffCanvasOpen}
                offCanvasOpen={this.offCanvasOpen}
                data={this.state.tappedNodeData}
            />
            <header className="App-header">
              <SearchBar
                  value={searchTerm}
                  instruction={instructionText}
                  handleSearch={this.handleSearch}
                  buttonVisible={this.state.buttonVisible}
                  onButtonClick={this.handleButtonClick}
                  onSuggestionHighlighted={this.handleHighlightedSuggestion}
                  onSubmit={this.onSubmit}
              />
            </header>
            <main role="main" className="network container-fluid">
                  <Graph
                    graph={this.state.graph}
                    options={options}
                    events={this.state.events}
                    getNetwork={network => this.setState({ network }) }
                  />
                  { this.state.loading && <div className="loader"></div> }
            </main>
        </div>
    )
  };
}

export default App;
