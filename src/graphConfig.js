export const options = {
    autoResize: true,
    interaction: {
        hover: true,
        hoverConnectedEdges: true,
    },
    "edges": {
        "font": {
            face: 'arial',
            color: '#FFFFFF',
            strokeColor: '#000000'
        },
        "width": 8,
        "length": 20
    },
    "nodes": {
        "font": {
            face: 'arial',
            color: '#FFFFFF'
        },
        "borderWidth": 10,
    },
    "physics": {
        "forceAtlas2Based": {
            "centralGravity": 0.007,
            "springConstant": 0.09,
            "damping": 0.9
        },
        "solver": "forceAtlas2Based",
        "maxVelocity": 10,
        "minVelocity": 3,
        "timestep": 0.4,
    }
};

const edgeNames = {
    album: "recorded",
    event: "performed",
    performer: "performed",
    producer: "released",
    release: "released",
    location: "located in",
    show: "located in",
    related: "related to",
    byArtist: "recorded",
    artist: "signed",
    label: "signed"
};


export const createNode = (data) => {
    let node = {
        id: data._id,
        uri: data._id,
        next: 0,
        mass: 2.5
    }

    if (data._type[0] === "Place") {
        node.shape = 'image'
        node.image = "https://image.flaticon.com/icons/svg/664/664577.svg"
        node.size = 40
        node.label = data.name
        node.type = "location"
        node.expanded = false
    } else if (data._type[0] === "MusicGroup") {
        node.size = 30
        node.type = "artist"
        node.color = {
            background: '#983131',
            border: '#983131',
            highlight: '#E74E4E',
            hover: '#E74E4E'
        }
        node.expanded = false
        if (data.image != null) {
            node.image = data.image
            node.shape = 'circularImage'
            node.brokenImage = "https://image.flaticon.com/icons/svg/149/149071.svg"
        } else {
            node.image = "https://image.flaticon.com/icons/svg/149/149071.svg"
            node.shape = 'circularImage'
        }
        node.label = data.name
        node.description = data.description
        node.url = data.sameAs

    } else if (data._type[0] === "MusicAlbum") {
        node.size = 30
        node.type = "album"
        node.color = {
            background: '#543A71',
            border: '#543A71',
            highlight: '#A573DC',
            hover: '#A573DC'
        }
        node.expanded = false
        if (data.image != null) {
            node.image = data.image
            node.shape = 'circularImage'
            node.brokenImage = "https://image.flaticon.com/icons/svg/2673/2673563.svg"
        } else {
            node.image = "https://image.flaticon.com/icons/svg/2673/2673563.svg"
            node.shape = 'circularImage'
        }

        node.label = data.name
        node.format = data.format
        node.datePublished = data.datePublished
        node.average = data.average

    } else if (data._type[0] === "MusicEvent") {
        node.size = 30
        node.type = "concert"
        node.color = {
            background: '#0E4E4A',
            border: '#0E4E4A',
            highlight: '#1FA29A',
            hover: '#1FA29A'
        }
        node.expanded = false
        if (data.image != null) {
            node.image = data.image
            node.shape = 'circularImage'
            node.brokenImage = "https://www.flaticon.com/premium-icon/icons/svg/1598/1598759.svg"
        } else {
            node.image = "https://www.flaticon.com/premium-icon/icons/svg/1598/1598759.svg"
            node.shape = 'circularImage'
        }

        node.label = 'Concert'
        node.eventDate = data.eventDate
        node.average = data.average


    } else if (data._type[0] === "Organization") {
        node.size = 40
        node.type = "label"
        node.expanded = false
        node.image = "https://image.flaticon.com/icons/svg/2905/2905064.svg"
        node.shape = 'image'
        node.label = data.name
        node.title = ''
    }

    return node;
}

export const createEdge = (...data) => {
    let edge;
    const parent = data[0];
    const relation = data[1];
    const entity = data[2];

    if (relation === "album") {
        edge = {
            id: parent + "_album_" + entity._id,
            from: parent,
            to: entity._id,
            label: edgeNames.album,
            arrows: {
                to: true
            },
            color: {
                color: '#543A71',
                hover: "#A573DC",
                highlight: "#A573DC"
            }
        }
    }
    if (relation === "byArtist") {
        edge = {
            id: entity._id + "_album_" + parent,
            from: entity._id,
            to: parent,
            label: edgeNames.byArtist,
            arrows: {
                to: true
            },
            color: {
                color: '#543A71',
                hover: "#A573DC",
                highlight: "#A573DC"
            }
        }
    }
    if (relation === "event") {
        edge = {
            id:  parent + "_concert_" + entity._id,
            from: parent,
            to: entity._id,
            label: edgeNames.event,
            arrows: {
                to: true
            },
            color: {
                color: '#0E4E4A',
                highlight: '#1FA29A',
                hover: '#1FA29A'
            }
        }
    }
    if (relation === "performer") {
        edge = {
            id:  entity._id + "_concert_" + parent,
            from: entity._id,
            to: parent,
            label: edgeNames.performer,
            arrows: {
                to: true
            },
            color: {
                color: '#0E4E4A',
                highlight: '#1FA29A',
                hover: '#1FA29A'
            }
        }
    }
    if (relation === "show") {
        edge = {
            id:  entity._id + "_location_" + parent,
            from: parent,
            to: entity._id,
            label: edgeNames.show,
            arrows: {
                to: true
            },
            color: {
                color: '#0E4E4A',
                highlight: '#1FA29A',
                hover: '#1FA29A'
            }
        }
    }
    if (relation === "producer") {
        edge = {
            id: entity._id + "_producer_" + parent,
            from: entity._id,
            to: parent,
            label: edgeNames.producer,
            arrows: {
                to: true
            },
            color: {
                color: '#0384fc',
                highlight: '#67b5fd',
                hover: '#67b5fd'
            }
        }
    }
    if (relation === "release") {
        edge = {
            id: parent + "_producer_" + entity._id,
            from: parent,
            to: entity._id,
            label: edgeNames.release,
            arrows: {
                to: true
            },
            color: {
                color: '#0384fc',
                highlight: '#67b5fd',
                hover: '#67b5fd'
            }
        }
    }
    if (relation === "related") {
        let vertices = [entity._id, parent];
        vertices.sort();
        edge = {
            id: vertices[0] + "_related_" + vertices[1],
            from: vertices[0],
            to: vertices[1],
            label: edgeNames.related,
            arrows: {
                from: true,
                to: true
            },
            color: {
                color: '#983131',
                hover: "#E74E4E",
                highlight: "#E74E4E"
            }
        }
    }
    if (relation === "location") {
        edge = {
            id: parent + "_location_" + entity._id,
            from: parent,
            to: entity._id,
            label: edgeNames.location,
            arrows: {
                to: true
            },
            "color": {
                color: '#0E4E4A',
                highlight: '#1FA29A',
                hover: '#1FA29A'
            }
        }
    }
    if (relation === "artist") {
        edge = {
            id: entity._id + "_label_" + parent,
            from: entity._id,
            to: parent,
            label: edgeNames.artist,
            arrows: {
                to: true
            },
            "color": {
                color: '#CC2F90',
                highlight: '#DB6DB1',
                hover: '#DB6DB1'
            }
        }
    }
    if (relation === "label") {
        edge = {
            id: parent + "_label_" + entity._id,
            from: parent,
            to: entity._id,
            label: edgeNames.label,
            arrows: {
                to: true
            },
            "color": {
                color: '#CC2F90',
                highlight: '#DB6DB1',
                hover: '#DB6DB1'
            }
        }
    }
    return edge;
}
