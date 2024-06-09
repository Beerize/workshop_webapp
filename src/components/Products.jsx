import React, { useState , useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import Spinner from 'react-bootstrap/Spinner';
import { url } from '../Utilities/urlAPI';

function Products({prodData}) {


    const [saving, setSaving] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [ifTrue, setIfTrue] = useState(false);
    const [itemId, setItemId] = useState(0);
    const [products, setProduct] = useState([]);
    // const [products, setProduct] = useState(
    //     [
    //         { buyAmount: 0, stAmount: 2, price: 200.39, name: 'Bag1', id: "AA01", imgPic: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFnfGVufDB8fDB8fHww' },
    //         { buyAmount: 0, stAmount: 1, price: 140.46, name: 'Bag2', id: "AA02", imgPic: 'https://plus.unsplash.com/premium_photo-1680373109883-47a3617e9acd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFnfGVufDB8fDB8fHww' },
    //         { buyAmount: 0, stAmount: 4, price: 350.74, name: 'Bag3', id: "AA03", imgPic: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmFnfGVufDB8fDB8fHww' },
    //     ]
    // );



    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${url.toString()}/Product/GetProduct`);
            res
              .json()
              .then(res => setProduct(res))
              .catch(err => setErrors(err));
        }

        fetchData()
    }, [])


    function addItemToCart(itemId) {
        
        setItemId(itemId);

        const found = products.find((element) => element.id == itemId);
        

        if(found){
            if(found.stAmount > 0){

                const index = products.indexOf(found);              
                if (index > -1) { // only splice array when item is found
                    found.stAmount = found.stAmount - 1;
                    found.buyAmount = found.buyAmount + 1;
                    products.splice(index, 1, found); // 2nd parameter means remove one item only    
                }
            }
        }       
        setProduct([...products]);
        //console.log("current stock ===> ", products)

        const foundPick = products.find((element) => element.buyAmount > 0);
        if(foundPick){
          setIfTrue(true);
        }
    }


    function removeItemFromCart(itemId) {
      //alert(itemId)
        
      setItemId(itemId);

      const found = products.find((element) => element.id == itemId);

      if(found){
          if(found.buyAmount > 0){

              const index = products.indexOf(found);              
              if (index > -1) { // only splice array when item is found
                  found.stAmount = found.stAmount + 1;
                  found.buyAmount = found.buyAmount - 1;
                  products.splice(index, 1, found); // 2nd parameter means remove one item only         
              }
          }
      }       
      setProduct([...products]);

      const foundPick = products.find((element) => element.buyAmount > 0);
      if(!foundPick){
        setIfTrue(false);
      }

  }



  async function postData(data = {}) {
    const res = await fetch(`${url.toString()}/Product/PostBuyProduct`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    res
      .json()
      .then(res => {
          console.log(res);
        if(res.status == true){

          setSaving(false);
          Swal.fire({
            title: 'Buying Complete',
            text: 'Thank you for your support.',
            icon: 'success',
            confirmButtonText: 'Ok Thank'
          })
          .then((value) => {
            location.reload();
          })
          .catch((err) => {
            location.reload();
          })

          
          
        }


      })
      .catch(err => setErrors(err));
  }


  function confirmToBuy() {
    Swal.fire({
      title: 'Please confirm!',
      text: 'Do you want to buy this ?',
      icon: 'question',
      confirmButtonText: 'Confirm to buy'
    }
  )
  .then((result) => {
    if(result.isConfirmed){
      setSaving(true);

      var data = [];

      products.map((item) => {
          if(item.buyAmount > 0){
            var pro = {
              productid: item.id,
              buyAmount: item.buyAmount
            }

            data.push(pro);
          }
      })


      postData(data)
    }
  })
  }


  return (
    <>

        {/* <div>
          <span>{JSON.stringify(products)}</span>
        </div> */}
        
        <h2>Product List</h2>
        {/* <div>Item Id : {itemId}</div> */}

        <Row>
            {products.map(item => (
                <Col key={item.id}>
                    <Card style={{ marginBottom: '1.5rem', width: '300px' }}>
                    <Card.Img variant="top" style={{width: '100%', height: '300px'}} src={item.imgPic} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        Price: {item.price} $
                      </Card.Text>

                      <Card.Text>
                         Stock Amount: {item.stAmount}
                      </Card.Text>
                      <Button disabled={saving == true ? true : false } onClick={() => addItemToCart(item.id)} variant="primary">Add to Cart</Button>
                    </Card.Body>
                  </Card>
                </Col>
            ))}
            </Row>

    {ifTrue ? (
        <>
          <Row>
            <Col xs={3}><h3>Cart List</h3></Col>
            <Col className='d-flex justify-content-end mb-3'>

                  {saving == true ? (
                    
                    <Button variant="primary" size="md" disabled>
                                  <Spinner size="sm" animation="border" variant="light" /> {' '}
                                  Loading...
                    </Button>
                  ) : (
                         <Button onClick={() => confirmToBuy()} variant="warning"><b style={{color: '#1B1212'}}>Confirm</b></Button>
                    )}

                
            </Col>
          </Row>
            
            <Table striped bordered hover>
              <thead>
                <tr>
                 
                    <th>
                      <span className="d-flex justify-content-center">
                      Order
                      </span>  
                    </th>                 
                 
          
                    <th >
                      

                      <span className="d-flex justify-content-center">
                      Product Id
                      </span>  
                    </th>
              
                    <th> 
                      <span className="d-flex justify-content-center">
                        Product Name
                      </span>              
                    </th>
         
        
                    <th>
                      <span className="d-flex justify-content-center">
                           Product Price / Unit
                      </span>      
                    </th>
                  
         
                    <th>
                      <span className="d-flex justify-content-center">
                        Amount
                      </span>
                    
                    </th>
               
                </tr>
              </thead>
              <tbody>

                {products.map((item, index) => {
                  if(item.buyAmount > 0){

                    return (
                      <tr>
                  
                        <td>
                          <span className="d-flex justify-content-center">
                          <p>{index + 1}</p>
                          </span>                         
                        </td>

                    
                      <td>{item.id}</td>
                      <td>{item.name}</td>


              
                        <td>
                          <span className="d-flex justify-content-center">
                            
                          <p>{item.price} $ / <span>piece</span></p>
                          </span>
                        </td>
                 

                   
                        <td>
                        <ButtonGroup className="me-2" aria-label="First group">
                          <Button disabled={saving == true ? true : false } onClick={() => removeItemFromCart(item.id)} variant="secondary">-</Button>{' '}
                          <Button disabled variant="secondary">{item.buyAmount}</Button>
                          <Button disabled={saving == true ? true : false } onClick={() => addItemToCart(item.id)} variant="secondary">+</Button>
                        </ButtonGroup>
                        </td>
                   
                    </tr>
                    )
 
                  }
                  else{
                    return <></>
                  }

                })}
              </tbody>
            </Table>
        </>
    ) : (
        <div></div>
    )}

    </>
  )
}

export default Products