import React from 'react'
import { connect } from 'react-redux'
import { getDrawing, saveDrawing, removeDrawing } from 'models/actions'
import Loading from 'components/loading'
import Canvas2Image from './canvas2image' // npm version has bug.
import { changeColor, changeWidth, eraser, draw, keep, replay } from './tools'
import "./style.scss"

const STROKE_WIDTH = 6,
      STROKE_COLOR = '#FFFFFF'

function onColor ( color ) {
  changeColor( this.state.ctx, color, this.currentLineWidth )

  keep( this.state.history, 'changeColor', { color } )
}

function onWidth ( width ) {
  this.currentLineWidth = changeWidth( this.state.ctx, width )

  keep( this.state.history, 'changeWidth', { width } )
}

@connect( ( { drawing, user } ) => ( { drawing, user } ), { getDrawing, saveDrawing, removeDrawing } )
export default class Canvas extends React.Component {

  constructor ( props ) {
    super( props )

    this.interval = null
    this.canvasRef = React.createRef()
    this.currentLineWidth = STROKE_WIDTH

    this.state = {
      id: null,
      ctx: null,
      isPrivate: false,
      creationDateTime: null,
      elapsedTime: 0,
      history: [],
      painting: false,
      loading: false
    }
  }

  componentDidMount () {
    const canvas = this.canvasRef.current,
          ctx = canvas.getContext( "2d" )

    var drawingId = this.props.match.params.id

    drawingId && this.props.getDrawing( +drawingId )

    this.state.ctx = ctx
    this.offsetX = canvas.offsetLeft
    this.offsetY = canvas.offsetTop
  
    // default settings
    ctx.lineWidth = STROKE_WIDTH
    ctx.strokeStyle = STROKE_COLOR
    
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

  startPosition = ( e ) => {
    this.setState( { painting: true } )

    this.draw( e )
  }
  
  finishedPostion = ( e ) => {
    this.setState( { painting: false } )
    this.state.ctx.beginPath()
  }

  draw = ( e ) => {
    if ( !this.state.painting )
      return

    this.startCreationDateTime()

    this.startInterval()
    
    const x = e.clientX - this.offsetX + window.pageXOffset,
          y = e.clientY - this.offsetY + window.pageYOffset

    draw( this.state.ctx, x, y )

    keep( this.state.history, 'draw', { x, y } )
  }

  startCreationDateTime = () => {
    if ( !this.state.creationDateTime ) {
      this.setState( { creationDateTime: new Date() } )
    }
  }

  tick = () => {
    this.setState( state => ( { elapsedTime: state.elapsedTime + 1 } ) )
  }

  startInterval = () => {
    if ( !this.interval ) {
      this.interval = setInterval( this.tick, 1000 )
    }
  }

  changeToEraser = ( e ) => {
    eraser( this.state.ctx )

    keep( this.state.history, 'eraser' )
  }

  togglePrivate = ( e ) => {
    this.setState( state => ( { isPrivate: !state.isPrivate } ) )
  }

  save = ( e ) => {
    const { id, isPrivate, creationDateTime, elapsedTime, history } = this.state,
          { user } = this.props,
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
    this.props.removeDrawing ( this.state.id )
    this.props.history.push( '/' )
  }

  static getDerivedStateFromProps ( props, state ) {
    if ( props.drawing.isFetching && !state.loading ) {
      return { loading: true }
    }

    if ( state.loading && !props.drawing.isFetching ) {
      const { id, isPrivate, creationDateTime, elapsedTime, history } = props.drawing

      replay( state.ctx, history )
      return { id, isPrivate, creationDateTime, elapsedTime, history, loading: false }
    }

    return null
  }

  render () {
    const width = 800,
          height = 600
  
    return (
      <div className="canvas">
        <h1>Canvas</h1>

        <div className="drawing-info">
          <div>Creation date &amp; time: <span>{ this.state.creationDateTime && this.state.creationDateTime.toLocaleString() }</span></div>
          <div><label><input type="checkbox" checked={ this.state.isPrivate } onChange={ this.togglePrivate } /> Private</label></div>
          <div>Elapsed time: <span>{ this.state.elapsedTime }</span> sec.</div>

          {
            this.state.loading && <Loading />
          }
        </div>

        <div className="wrapper">
          <canvas className="drawing-canvas" width={ width } height={ height } ref={ this.canvasRef }> 
          We're sorry, the browser you are using does not support glt;canvas&gt;. Please upgrade your browser. 
            { /* Anything inside of the canvas tag will only display if the browser does not support the <canvas> tag. */ }
          </canvas>

          <div className="toolbox">

            <div className="stroke-color">
              <img src="/images/white.png" alt="white" onClick={ onColor.bind( this, '#FFFFFF' ) } /> 
              <img src="/images/red.png" alt="red" onClick={ onColor.bind( this, '#F00000' ) } /> 
              <img src="/images/orange.png" alt="orange" onClick={ onColor.bind( this, '#ff9600' ) } /> 
              <img src="/images/yellow.png" alt="yellow" onClick={ onColor.bind( this, '#fff600' ) } /> 
              <img src="/images/green.png" alt="green" onClick={ onColor.bind( this, '#48ff00' ) } /> 
              <img src="/images/blue.png" alt="blue" onClick={ onColor.bind( this, '#001eff' ) } /> 
              <img src="/images/pink.png" alt="pink" onClick={ onColor.bind( this, '#ff00d2' ) } /> 
              <img src="/images/eraser.png" alt="eraser" onClick={ this.changeToEraser } /> 
            </div>


            <div className="stroke-weight">
              <img src="/images/stroke1.png" alt="1.0" onClick={ onWidth.bind( this, 1.0 ) } />
              <img src="/images/stroke2.png" alt="6.0" onClick={ onWidth.bind( this, 6.0 ) } />
              <img src="/images/stroke3.png" alt="9.0" onClick={ onWidth.bind( this, 9.0 ) } />
              <img src="/images/stroke4.png" alt="13.0" onClick={ onWidth.bind( this, 13.0 ) } />
            </div>

            <div className="operations">
              <img src="/images/save.png" alt="Save" onClick={ this.save } /> 
              {
                this.state.id && <img src="/images/cross.png" alt="Delete" onClick={ this.delete } /> 
              }
            </div>

          </div>

        </div>

      </div>
    )
  }
}

// export default Canvas
