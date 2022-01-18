import './bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { Container, Col, Button, ButtonGroup, Row, Form } from 'react-bootstrap'
import axios from 'axios'
import { path } from './constants/pathConstant'
import Item from './components/Item'

const App = () => {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [add, setAdd] = useState(false)
  useEffect(async () => {
    const { data } = await axios.get(`${path}/items`)
    setItems(data)
  }, [])

  const createItemHandler = async (e) => {
    e.preventDefault()
    const newItem = {
      img_link: null,
      author_id: 0,
      title: title,
      description: desc,
    }
    const { data } = await axios.post(`${path}/items`, newItem)
    console.log(data.newItem)
    setItems(items.concat(data.newItem))
    setAdd(!add)
  }

  const addItemHandler = async (e) => {
    e.preventDefault()
    setAdd(!add)
  }

  const removeHandler = async (e) => {
    e.preventDefault()
    const { data } = await axios.delete(`${path}/items`)
    setItems([])
  }

  return (
    <div>
      {/* <Header /> */}
      <main className='py-3'>
        <Container>
          <h2>Welcome to the Inventory!</h2>

          <>
            <ButtonGroup aria-label='Basic example'>
              {!add ? (
                <Button onClick={addItemHandler}>Add Item</Button>
              ) : (
                <Button onClick={addItemHandler}>Close</Button>
              )}
              {!add && (
                <Button onClick={removeHandler}>Delete All Items</Button>
              )}
            </ButtonGroup>
            {add ? (
              <Form>
                <Form.Group controlId='text'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='exampleForm.ControlTextarea1'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={10}
                    placeholder='Enter Description'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button onClick={createItemHandler}>Create new Item</Button>
              </Form>
            ) : (
              <Row>
                {items?.map((el) => (
                  <Item item={el} />
                ))}
              </Row>
            )}
          </>
        </Container>
      </main>
    </div>
  )
}

export default App
