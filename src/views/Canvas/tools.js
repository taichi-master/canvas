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
  