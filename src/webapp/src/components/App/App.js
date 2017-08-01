import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import aframe from 'aframe'
import 'aframe-look-at-component'
import 'aframe-mouse-cursor-component'
import registerClickDrag from 'aframe-click-drag-component'
registerClickDrag(aframe)

const mapStateToProps = (state) => ({})

@connect(mapStateToProps, null)
export default class Viewer extends Component {
  static propTypes = {
    invertControls: PropTypes.bool,
    image: PropTypes.any,
    // rotation: PropTypes.string,
    zoom: PropTypes.number
  }

  static defaultProps = {
    invertControls: true,
    image: require('./test.jpg'),
    zoom: 1
  }

  state = {
    rotation: '0 0 0',
    enableLook: true,
    lastCast: {
      position: {},
      rotation: {}
    }
  }

  registeredComponents = []

  componentWillMount () {
    this.registerComponents()
    // window.addEventListener('onkeypress', (evt) => {
    //   console.info(evt)
    // })
  }

  componentDidMount () {
    this.addZoomListener()

    // we must set the rotation component here instead of on the a-entity.
    // if it is set in the a-entity then when a user switches captures,
    // the rotation updates before a new image loads and we see a flash
    // of the old image rotating before the new image loads
    // this.setRotation(this.props.rotation)
  }

  componentWillUnmount () {
    // const {AFRAME} = window
    // this.registeredComponents.forEach((component) => {
    //   if (AFRAME.components[component]) {
    //     delete AFRAME.components[component]
    //   }
    // })
  }

  componentWillReceiveProps (nextProps) {
    // const {image} = this.props
    // const {image: nextImage} = nextProps
    //
    // // If a new material is being applied, we need to wait to prevent
    // // the rotation from occuring before the material and hotspots are loaded
    // if (nextImage !== image) {
    //   document.querySelector('#sky').addEventListener('materialtextureloaded', () => {
    //     this.setState({
    //       rotation: nextProps.rotation
    //     })
    //   })
    // } else {
    //   this.setState({
    //     rotation: nextProps.rotation
    //   })
    // }
  }

  addZoomListener () {
    var canvas = document.querySelector('canvas')

    if (!canvas) {
      setTimeout(() => {
        this.addZoomListener()
      }, 500)
    } else {
      canvas.addEventListener('mousewheel', (evt) => {
        this.handleZoom(evt.deltaY)
      })
    }
  }

  registerComponents () {
    const {AFRAME} = window
    const viewer = this

    // Component attempted to register before AFRAME was available
    if (!AFRAME) return

    // Cannot register the same componet twice
    if (!AFRAME.components['sphere-listener']) {
      // Used to capture raycasts intersections for placement of hotspots
      this.registeredComponents.push('sphere-listener')
      AFRAME.registerComponent('sphere-listener', {
        init () {
          const {el} = this
          el.addEventListener('mouseup', (evt) => {
            const camera = document.querySelector('#camera')
            viewer.handleRaycastUpdate(evt.detail.intersection.point, camera.components.rotation)
          })
        }
      })
    }

    if (!AFRAME.components['resizable']) {
      this.registeredComponents.push('resizable')
      AFRAME.registerComponent('resizable', {
        init () {
          const {el} = this

          el.addEventListener('mousedown', function (evt) {
            // console.info('mousedown', evt)

          })

          el.addEventListener('mouseup', function (evt) {
            // viewer.setState({enableLook: true})
            const geometry = el.getAttribute('geometry')

            el.setAttribute('geometry', {
              ...geometry,
              width: geometry.width + 0.2,
              height: geometry.height + 0.2
            })
          })
        }
      })
    }

    if (!AFRAME.components['drag-handler']) {
      this.registeredComponents.push('drag-handler')
      AFRAME.registerComponent('drag-handler', {
        schema: {
          default: '0 0 0',
          type: 'string'
        },
        init () {
          const {el} = this

          el.addEventListener('dragstart', function (evt) {
            viewer.setState({enableLook: false})
          })

          el.addEventListener('dragend', (evt) => {
            const position = evt.target.getAttribute('position')
            const id = evt.target.getAttribute('id')
            viewer.handleBlurMove(id, position)
            viewer.setState({enableLook: true})
          })
        }
      })
    }

    // Cannot register the same componet twice
    if (!AFRAME.components['icon-listener']) {
      this.registeredComponents.push('icon-listener')

      // Used to handle the click event on hotspots in the scene
      AFRAME.registerComponent('icon-listener', {
        init () {
          const {el} = this
          el.addEventListener('click', (evt) => {
            viewer.handleHotspotClick(JSON.parse(el.dataset.hotspot))
          })
        }
      })
    }
  }

  handleBlurMove = (id, position) => {
    // const {cb} = this.props
    // if (cb) {
    //   cb('editBlur', {id, position})
    // }
  }

  handleHotspotClick = (hotspot) => {
    // const {cb} = this.props
    // if (cb) {
    //   const action = hotspot.type === 'info' ? 'showInfo' : 'changeRoom'
    //   cb(action, hotspot)
    // }
  }

  handleZoom (deltaY) {
    // const {cb} = this.props
    // if (cb) {
    //   cb('zoom', deltaY)
    // }
  }

  handleRaycastUpdate (position, rotation) {
    // const {cb} = this.props
    // this.setState({
    //   lastCast: {
    //     position: {...position},
    //     rotation: {...rotation.data}
    //   }
    // }, () => {
    //   if (cb instanceof Function) {
    //     cb('lastCast', this.state.lastCast)
    //   }
    // })
  }

  render () {
    const {
      image,
      invertControls,
      zoom
    } = this.props
    const {rotation, enableLook} = this.state

    if (!image) return false

    const shpere = {
      color: '#000000',
      radius: 30,
      opacity: 0,
      side: 'back'
    }

    return (
      <div className={`viewer-wrapper`}>
        <div className="360-viewer" style={{position: 'relative'}}>
          <a-scene antialias="true">
            <a-assets>
              <img id="capture-image" src={image} />
            </a-assets>

            <a-entity
              scale="1 1 -1"
              material={`shader: flat; src: ${image}`}
              id="sky"
              geometry="primitive: sphere; radius: 100"
            />

            <a-entity
              position="0 0 0"
              id="camera"
              rotation={rotation}
              camera={`zoom: ${zoom}; active: true;`}
              look-controls={`reverseMouseDrag: ${!invertControls}; enabled: ${enableLook}`}
              mouse-cursor="objects: .hotspot-entity"
            >
              <a-cursor fuse="true" fuse-timeout="0" color="yellow" objects="#cast-sphere" />
              <a-cursor fuse="true" color="yellow" objects=".hotspot-entity" />
            </a-entity>

            <a-sphere id="cast-sphere" sphere-listener {...shpere} />
          </a-scene>
        </div>
      </div>
    )
  }
}
