import React, { useState } from 'react'
import { Card, Form, Buttom } from 'react-bootstrap'
import axios from 'axios'
import { path } from '../constants/pathConstant'
import { Button } from 'react-bootstrap'
const Item = ({ item }) => {
  console.log(item)
  const [itemPic, setItemPic] = useState(
    item.img_link === null
      ? 'https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg'
      : item.img_link
  )

  const [edit, setEdit] = useState(false)
  const [show, setShow] = useState(true)
  const [title, setTitle] = useState(item.title)
  const [desc, setDesc] = useState(item.description)
  const removeHandler = async (e) => {
    e.preventDefault()
    setShow(!show)
    const { data } = await axios.delete(`${path}/items/${item.id}`)
  }

  const updateHandler = async (e) => {
    e.preventDefault()
    const newItem = {
      img_link: itemPic,
      title: title,
      description: desc,
      last_edit_id: 0,
    }

    const { data } = await axios.put(`${path}/items/${item.id}`, newItem)
    setEdit(!edit)
  }
  const editHandler = async (e) => {
    e.preventDefault()
    setEdit(!edit)
  }

  return (
    <>
      {show && (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant='top' src={itemPic} />
          {!edit ? (
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{desc}</Card.Text>
            </Card.Body>
          ) : (
            <Form>
              <Form.Group controlId='text'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  as='textarea'
                  rows={2}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='text'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  as='textarea'
                  rows={5}
                ></Form.Control>
              </Form.Group>
            </Form>
          )}

          <Card.Body>
            <Card.Text>
              {!edit ? (
                <Button variant='primary' onClick={editHandler}>
                  Edit
                </Button>
              ) : (
                <Button variant='primary' onClick={editHandler}>
                  Close
                </Button>
              )}

              {!edit ? (
                <Button variant='primary' onClick={removeHandler}>
                  Remove
                </Button>
              ) : (
                <Button variant='primary' onClick={updateHandler}>
                  Update
                </Button>
              )}
            </Card.Text>
          </Card.Body>

          {item.last_edit_id !== null && (
            <Card.Footer className='text-muted'>
              Last Edited By id: {item.last_edit_id},{item.edit_date}
            </Card.Footer>
          )}
          <Card.Footer className='text-muted'>
            Added By id: {item.author_id},{item.post_date}
          </Card.Footer>
        </Card>
      )}
    </>
  )
}

export default Item
