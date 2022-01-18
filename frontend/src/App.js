import './bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { Container, Col, Button, ButtonGroup, Row } from 'react-bootstrap'
import axios from 'axios'
import { path } from './constants/pathConstant'
import Item from './components/Item'

const App = () => {
  const [items, setItems] = useState([])
  const [add, setAdd] = useState(false)
  useEffect(async () => {
    const { data } = await axios.get(`${path}/items`)
    setItems(data)
  }, [])

  return (
    <div>
      {/* <Header /> */}
      <main className='py-3'>
        <Container>
          <h2>Welcome to the Inventory!</h2>

          <>
            <ButtonGroup aria-label='Basic example'>
              <Button>Add Item</Button>
              <Button>Delete All Items</Button>
            </ButtonGroup>
            <Row>
              {items?.map((el) => (
                <Item item={el} />
              ))}
            </Row>
          </>
        </Container>
      </main>
    </div>
  )
}

export default App
