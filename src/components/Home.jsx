import React from 'react'
import Nav from './Nav'
import ProductList from './ProductList'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
  return (
    <>
      <Nav />
      <Container id='mainHome'>
        <Row>
            <Col xs={4}>Category : accessories</Col>
            <Col>
              <ProductList />
            </Col>
        </Row>
    </Container>
    </>
   
  )
}

export default Home