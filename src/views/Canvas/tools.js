
export function changeColor ( ctx, color, currentLineWidth ) {
  ctx.strokeStyle = color

  // reset from eraser
  ctx.globalCompositeOperation = "source-over"
  ctx.lineWidth = currentLineWidth
}

export function changeWidth ( ctx, width ) {
  ctx.lineWidth = width
}

export function eraser ( ctx ) {
  ctx.globalCompositeOperation = "destination-out"
  ctx.strokeStyle = "rgba(255,255,255,1)"
  ctx.lineWidth = '22'
}
  
export function draw ( ctx, x, y ) {
  ctx.lineCap = 'round'
  ctx.lineTo( x, y )
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo( x, y )
}

export function keep ( history, action, params ) {
  history.push( {
    dt: new Date(),
    action,
    params
  } )    
}

function resetPath ( ctx ) {
  ctx.beginPath()
}

export function replay ( ctx, history ) {
  var currentLineWidth = ctx.lineWidth

  function play ( { action, params } ) {
    switch ( action ) {
    case 'draw':
      draw( ctx, params.x, params.y )
      break
  
    case 'eraser':
      eraser( ctx )
      resetPath( ctx )
      break
  
    case 'changeColor':
      changeColor( ctx, params.color, currentLineWidth )
      resetPath( ctx )
      break
  
    case 'changeWidth':
      changeWidth( ctx, params.width )
      currentLineWidth = params.width
      resetPath( ctx )
      break
    }  
  }
  
  history.forEach( play )
  resetPath( ctx )
}


