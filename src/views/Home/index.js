import React from 'react'

const pkg = require( "package.json" )

// console.log( 'load Home' )

export default function Home () {
  return (
    <div className="home">
      <h1>Home</h1>
      <h1 className="project">{ pkg.description }</h1>
    </div>
  )
}