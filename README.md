#  Xsilence Connections ![logo](https://raw.githubusercontent.com/chaos87/xsgraph/master/docs/favicon.ico)

**Xsilence Connections** is a knowledge graph app demo built using [Staple API](http://staple-api.org) on top of [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).


# Live version

The live version of this demo is deployed at [http://xsilence.repl.it](http://xsilence.repl.it).


# Xsilence

The full documentiation of Staple API is available at [http://staple-api.org](http://staple-api.org).


# Running on REPL

1. Go to [https://repl.it/](https://repl.it/).
2. Press **+ new repl** to create a new Repl environment and choose **Import From GitHub**.
3. Paste the URL of this repository and import it.
4. Press the **Run** button and wait for the app to start at the automatically generated URL [https://***--five-nine.repl.co](#).

The application exposes two graphical interfaces:
- the demo FE at [https://***--five-nine.repl.co](#)
- the Apollo playground of the underlying Staple API at [https://***--five-nine.repl.co/graphql](#), where you can issue GraphQL queries to the remote MongoDB Atlas instance storing the application (knowledge graph) data, e.g.:

```graphql
{
  MusicGroup(filter: { _id: "http://www.xsilence.net/artiste-62.htm" }) {
    _id
    _type
    name
    description
    sameAs
    image
    album {
      _id
      _type
      name
      image
      average
      format
      producer {
        _id
        _type
        name
      }
    }
    event {
      _id
      _type
      image
      average
      location {
        _id
        _type
        name
        containedInPlace {
          _id
          _type
          name
        }
      }
    }
    relatedMusicGroups {
      _id
      _type
      name
    }
  }
  _CONTEXT {
    _id
    _type
    MusicGroup
    MusicAlbum
    MusicEvent
    Place
    Organization
    name
    description
    average
    format
    image
    album
    event
    producer
    byArtist
    location
    containedInPlace
    relatedMusicGroups
  }
}
```

# Inspiration
I built this app after I read this article. I'm reusing exactly the same stack and app architecture [Knowledge Graph App in 15min. Prototyping a simple knowledge graph application with JSONs, MongoDB and automatically generated GraphQL API](https://medium.com/@sklarman/c76b94bb53b3), S. Klarman, 2020.
