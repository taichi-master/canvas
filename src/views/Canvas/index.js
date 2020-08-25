import React from 'react'
import { connect } from 'react-redux'
import { getDrawing, saveDrawing, removeDrawing } from 'models/actions'

import Canvas2Image from './canvas2image' // npm version has bug.
import "./style.scss"

function changeColor ( color ) {
  const ctx = this.ctx

  ctx.strokeStyle = color

  // reset from eraser
  ctx.globalCompositeOperation = "source-over"
  ctx.lineWidth = this.strokeWidth

  this.isKeepingHistory && this.keepHistory( 'changeColor', { color } )
}

function changeWidth ( width ) {
  this.ctx.lineWidth = this.strokeWidth = width

  this.isKeepingHistory && this.keepHistory( 'changeWidth', { width } )
}

function eraser ( ctx ) {
  ctx.globalCompositeOperation = "destination-out"
  ctx.strokeStyle = "rgba(255,255,255,1)"
  ctx.lineWidth = '22'
}

function draw ( ctx, x, y ) {
  ctx.lineCap = 'round'
  ctx.lineTo( x, y )
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo( x, y )
}

@connect( ( { drawing, user } ) => ( { drawing, user } ), { getDrawing, saveDrawing, removeDrawing } )
export default class Canvas extends React.Component {

  constructor ( props ) {
    super( props )

    this.interval = null
    this.canvasRef = React.createRef()
    this.strokeWidth = 6
    this.strokeColor = '#FFFFFF'
    this.id = this.props.match && this.props.match.params.id
    this.isKeepingHistory = true

    this.state = {
      isPrivate: false,
      creationDateTime: null,
      elapsedTime: 0,
      painting: false
    }
  }

  componentDidMount () {
    const canvas = this.canvasRef.current,
          ctx = canvas.getContext( "2d" )

    getDrawing( this.id )
    this.ctx = ctx
    this.offsetX = canvas.offsetLeft
    this.offsetY = canvas.offsetTop
  
    // default settings
    ctx.lineWidth = this.strokeWidth
    ctx.strokeStyle = this.strokeColor
    
    // Reszing
    // canvas.width = window.innerWidth
    // canvas.height = window.innerHeight

    canvas.addEventListener( 'mousedown', this.startPosition )
    canvas.addEventListener( 'mouseup', this.finishedPostion )
    canvas.addEventListener( 'mousemove', this.draw )
  }

  componentWillUnmount () {
    const canvas = this.canvasRef.current

    canvas.removeEventListener( 'mousedown', this.startPosition )
    canvas.removeEventListener( 'mouseup', this.finishedPostion )
    canvas.removeEventListener( 'mousemove', this.draw )

    this.interval && clearInterval( this.interval )
  }

  keepHistory = ( action, params ) => {
    this.props.drawing.history.push( {
      dt: new Date(),
      action,
      params
    } )    
  }

  replay = () => {
    this.isKeepingHistory = false

    this.props.history.forEach( function ( action, params ) {
      switch ( action ) {
      case 'draw':
        draw( this.ctx, params.x, params.y )
        break

      case 'eraser':
        eraser( this.ctx )
        break
      }  
    } )

    this.isKeepingHistory = true
  }

  startPosition = ( e ) => {
    this.setState( { painting: true } )

    this.draw( e )
  }
  
  finishedPostion = ( e ) => {
    this.setState( { painting: false } )
    this.ctx.beginPath()
  }

  draw = ( e ) => {
    if ( !this.state.painting )
      return

    if ( !this.state.creationDateTime ) {
      this.setState( { creationDateTime: new Date() } )
    }
    
    if ( !this.interval ) {
      this.interval = setInterval( this.tick, 1000 )
    }
    
    const x = e.clientX - this.offsetX + window.pageXOffset,
          y = e.clientY - this.offsetY + window.pageYOffset

    draw( this.ctx, x, y )

    this.isKeepingHistory && this.keepHistory( 'draw', { x, y } )
  }

  tick = () => {
    this.setState( state => ( { elapsedTime: state.elapsedTime + 1 } ) )
  }

  changeToEraser = ( e ) => {
    eraser( this.ctx )

    this.isKeepingHistory && this.keepHistory( 'eraser' )
  }

  togglePrivate = ( e ) => {
    this.setState( state => ( { isPrivate: !state.isPrivate } ) )
  }

  save = ( e ) => {
    const { isPrivate, creationDateTime, elapsedTime } = this.state,
          { drawing: { history }, user } = this.props,
          { id } = this,
          canvas = this.canvasRef.current,
          thumbnail = Canvas2Image.convertToJPEG( canvas, 80, 60 )

    this.props.saveDrawing( {
      id,
      user: user.id,
      isPrivate,
      creationDateTime,
      elapsedTime,
      history,
      thumbnail: thumbnail && thumbnail.src
    } )
  }

  delete = ( e ) => {
    this.props.removeDrawing ( this.props.id )
  }

  static getDerivedStateFromProps ( props, state ) {
    return null
  }

  render () {
    const width = 800,
          height = 600
  
    return (
      <div className="canvas">
        <h1>Canvas</h1>

        <div>Creation date &amp; time: <span>{ this.state.creationDateTime && this.state.creationDateTime.toLocaleString() }</span></div>
        <div><label><input type="checkbox" checked={ this.state.isPrivate } onChange={ this.togglePrivate } /> Private</label></div>
        <div>Elapsed time: <span>{ this.state.elapsedTime }</span> sec.</div>
        
        <canvas id="drawingCanvas" width={ width } height={ height } ref={ this.canvasRef }> 
          We're sorry, the browser you are using does not support glt;canvas&gt;. Please upgrade your browser. 
          { /* Anything inside of the canvas tag will only display if the browser does not support the <canvas> tag. */ }
        </canvas>

        <div className="toolbox">

          { /* Stroke color */ }
          <div id="stroke-color">
            <div id="whiteChalk_button"> 
              <img src="/images/white.png" width="71" height="17" onClick={ changeColor.bind( this, '#FFFFFF' ) } /> 
            </div> 
            <div id="redChalk_button"> 
              <img src="/images/red.png" width="71" height="17" onClick={ changeColor.bind( this, '#F00000' ) } /> 
            </div> 
            <div id="orangeChalk_button"> 
              <img src="/images/orange.png" width="71" height="17" onClick={ changeColor.bind( this, '#ff9600' ) } /> 
            </div> 
            <div id="yellowChalk_button"> 
              <img src="/images/yellow.png" width="71" height="17" onClick={ changeColor.bind( this, '#fff600' ) } /> 
            </div> 
            <div id="greenChalk_button"> 
              <img src="/images/green.png" width="71" height="17" onClick={ changeColor.bind( this, '#48ff00' ) } /> 
            </div> 
            <div id="blueChalk_button"> 
              <img src="/images/blue.png" width="71" height="17" onClick={ changeColor.bind( this, '#001eff' ) } /> 
            </div> 
            <div id="pinkChalk_button"> 
              <img src="/images/pink.png" width="71" height="17" onClick={ changeColor.bind( this, '#ff00d2' ) } /> 
            </div>
            <div id="eraser">
              <img src="/images/eraser.png" width="71" height="17" onClick={ this.changeToEraser } /> 
            </div>
          </div>


          { /* Stroke Weight Panel */ }
          <div id="stroke-weight">
            <img src="/images/stroke1.png" alt="1.0" className="stroke" width="30" height="32"
              onClick={ changeWidth.bind( this, 1.0 ) } />
            <img src="/images/stroke2.png" alt="6.0" className="stroke" width="30" height="32"
              onClick={ changeWidth.bind( this, 6.0 ) } />
            <img src="/images/stroke3.png" alt="9.0" className="stroke" width="30" height="32"
              onClick={ changeWidth.bind( this, 9.0 ) } />
            <img src="/images/stroke4.png" alt="13.0" className="stroke" width="30" height="32"
              onClick={ changeWidth.bind( this, 13.0 ) } />
          </div>

          { /* Brushes */ }
          <div id="stroke-brushes">
          </div>

          { /* Functions */ }
          <div id="functions">
            <img src="/images/save.png" width="32" height="32" alt="Save" onClick={ this.save } /> 
            {
              this.id && <img src="/images/cross.png" width="32" height="32" alt="Delete" onClick={ this.delete } /> 
            }
          </div>

        </div>

      </div>
    )
  }
}

// export default Canvas
