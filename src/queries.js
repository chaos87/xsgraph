const queries = {
    initArtist: `
        {
            MusicGroup(filter: {_id: "%s1"})
         {
           _id
           _type
           name
           description
           sameAs
           image
           album {
               _id
               _type
               image
               name
               average
               format
               datePublished
           }
           event {
               _id
               _type
               image
               average
               eventDate
           }
        }
    }`,
    initAlbum: `
        {
             MusicAlbum(filter: {_id: "%s1"})
         {
           _id
           _type
           name
           format
           average
           datePublished
           image
           producer {
               _id
               _type
               name
           }
           byArtist {
               _id
               _type
               name
               image
               description
               sameAs
           }
        }
    }`,
    initLabel: `
        {
             Organization(filter: {_id: "%s1"})
         {
           _id
           _type
           name
           release {
               _id
               _type
               image
               name
               average
               format
               datePublished
           }
        }
    }`,
    initLocation: `
        {
             Place(filter: {_id: "%s1"})
         {
           _id
           _type
           name
           show {
               _id
               _type
               image
               average
               eventDate
           }
           containedInPlace {
               _id
               _type
               name
           }
        }
    }`,
    getRelatedArtist: `
        {
            MusicGroup(filter: {_id: "%s1"})
         {
           _id
           _type
           name
           description
           sameAs
           image
           album {
               _id
               _type
               image
               name
               average
               format
               datePublished
           }
           event {
               _id
               _type
               image
               average
               eventDate
           }
           related {
               _id
               _type
               name
               description
               sameAs
               image
           }
        }
    }`,
    getRelatedAlbum: `
        {
            MusicAlbum(filter: {_id: "%s1"})
        {
          _id
          _type
          name
          format
          average
          datePublished
          image
          producer {
              _id
              _type
              name
          }
          byArtist {
              _id
              _type
              name
              image
              description
              sameAs
          }
       }
    }`,
    getRelatedConcert: `
        {
            MusicEvent(filter: {_id: "%s1"})
        {
          _id
          _type
          average
          eventDate
          image
          performer {
              _id
              _type
              name
              description
              image
              sameAs
          }
          location {
              _id
              _type
              name
          }
       }
    }`,
    getRelatedLabel: `
    {
            Organization(filter: {_id: "%s1"})
        {
          _id
          _type
          name
          release {
              _id
              _type
              image
              name
              average
              format
              datePublished
          }
       }
    }`,
    getRelatedLocation: `
        {
            Place(filter: {_id: "%s1"})
        {
          _id
          _type
          name
          show {
              _id
              _type
              image
              average
              eventDate
          }
          containedInPlace {
              _id
              _type
              name
          }
       }
    }`,
};

export default queries;
