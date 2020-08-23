import React from 'react'

import Canvas2Image from './canvas2image'
import "./style.scss"

var ctx
var painting = false
var offset = {
  x: 0,
  y: 0
}

function startPosition ( e ) {
  painting = true
  draw( e )
}

function finishedPostion ( e ) {
  painting = false
  ctx.beginPath()
}

function draw ( e ) {
  if ( !painting )
    return

  ctx.lineCap = 'round'

  var x, y

  x = e.clientX - offset.x
  y = e.clientY - offset.y

  ctx.lineTo( x, y )
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo( x, y )
}

const changeColor = ( color ) => {
  ctx.strokeStyle = color
}

const changeWidth = ( width ) => {
  ctx.lineWidth = width
}

class Canvas extends React.Component {

  constructor ( props ) {
    super( props )

    this.canvasRef = React.createRef() 
  }

  componentDidMount () {
    // init()
    const canvas = this.canvasRef.current

    offset.x = canvas.offsetLeft
    offset.y = canvas.offsetTop

    ctx = canvas.getContext( "2d" )

    // default settings
    ctx.lineWidth = 1
    ctx.strokeStyle = '#FFFFFF'
    
    // Reszing
    // canvas.width = window.innerWidth
    // canvas.height = window.innerHeight
    

    canvas.addEventListener( 'mousedown', startPosition )
    canvas.addEventListener( 'mouseup', finishedPostion )
    canvas.addEventListener( 'mousemove', draw )
  }

  componentWillUnmount () {
    canvas.removeEventListener( 'mousedown', startPosition )
    canvas.removeEventListener( 'mouseup', finishedPostion )
    canvas.removeEventListener( 'mousemove', draw )
  }

  render () {
    const width = 800,
          height = 600
  
    return (
      <div className="canvas">
        <h1>Canvas</h1>
        
        { /* Tool Selector */ }
        <p>
          <select name="selector" id="selector"> 
            <option value="chalk">Chalk</option> 
            <option value="line">Line</option> 
            <option value="rect">Rectangle</option> 
          </select> 
        </p>

        <canvas id="drawingCanvas" width={ width } height={ height } ref={ this.canvasRef }> 
        We're sorry, the browser you are using does not support glt;canvas>&gt;. Please upgrade your browser. 
          { /* Anything inside of the canvas tag will only display if the browser does not support the <canvas> tag. */ }
        </canvas>

        { /* Chalk Pieces */ }
        <div id="whiteChalk_button"> 
          <img src="images/white.png" width="71" height="17" onClick={ changeColor.bind( this, '#FFFFFF' ) } /> 
        </div> 
        <div id="redChalk_button"> 
          <img src="images/red.png" width="71" height="17" onClick={ changeColor.bind( this, '#F00000' ) } /> 
        </div> 
        <div id="orangeChalk_button"> 
          <img src="images/orange.png" width="71" height="17" onClick={ changeColor.bind( this, '#ff9600' ) } /> 
        </div> 
        <div id="yellowChalk_button"> 
          <img src="images/yellow.png" width="71" height="17" onClick={ changeColor.bind( this, '#fff600' ) } /> 
        </div> 
        <div id="greenChalk_button"> 
          <img src="images/green.png" width="71" height="17" onClick={ changeColor.bind( this, '#48ff00' ) } /> 
        </div> 
        <div id="blueChalk_button"> 
          <img src="images/blue.png" width="71" height="17" onClick={ changeColor.bind( this, '#001eff' ) } /> 
        </div> 
        <div id="pinkChalk_button"> 
          <img src="images/pink.png" width="71" height="17" onClick={ changeColor.bind( this, '#ff00d2' ) } /> 
        </div>

        { /* Stroke Weight Panel */ }
        <div id="strokeWeight">
          <img src="images/stroke1.png" alt="1.0" className="stroke" width="30" height="32"
            onClick={ changeWidth.bind( this, 1.0 ) } />
          <img src="images/stroke2.png" alt="6.0" className="stroke" width="30" height="32"
            onClick={ changeWidth.bind( this, 6.0 ) } />
          <img src="images/stroke3.png" alt="9.0" className="stroke" width="30" height="32"
            onClick={ changeWidth.bind( this, 9.0 ) } />
          <img src="images/stroke4.png" alt="13.0" className="stroke" width="30" height="32"
            onClick={ changeWidth.bind( this, 13.0 ) } />
        </div>

      </div>
    )
  }
}

export default Canvas
