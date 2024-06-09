import React from 'react'
import Nav from './Nav'

import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';


function Contact() {
  return (
    <>
      <Nav />
      <div className='d-flex justify-content-center'>
      <Carousel style={{width: '50%', margin: 15}}>
      <Carousel.Item>
        <ExampleCarouselImage img={"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHxlbnwwfHwwfHx8MA%3D%3D"} text="First slide" />
        <Carousel.Caption>
          <h3>First your like</h3>
          <p>You find your life styles</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage img={"https://plus.unsplash.com/premium_photo-1664202526744-516d0dd22932?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D"} text="Second slide" />
        <Carousel.Caption>
          <h3>Second Choose it</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage img={"https://images.unsplash.com/photo-1526745925052-dd824d27b9ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob3B8ZW58MHx8MHx8fDA%3D"} text="Third slide" />
        <Carousel.Caption>
          <h3>Buy it</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      </div>

    </>
    
  )
}

export default Contact