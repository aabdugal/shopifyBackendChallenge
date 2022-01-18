import React, { useState } from 'react'
import { Card, Form, Buttom } from 'react-bootstrap'
import axios from 'axios'
import { path } from '../constants/pathConstant'
import { Button } from 'react-bootstrap'
const Item = ({ item }) => {
  console.log(item)
  const [itemPic, setItemPic] = useState(item?.img_link)
  const [newItemPic, setNewItemPic] = useState()

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

  const uploadPicHandler = async (e) => {
    e.preventDefault()
    console.log(newItemPic)
    let form_data = new FormData()
    form_data.append('file', newItemPic)
    console.log(form_data)
    const { data } = await axios.put(
      `${path}/items/photo/${item.id}`,
      form_data,
      {
        headers: {
          'Content-Type': undefined,
        },
      }
    )
    console.log(data)
    setItemPic(data)
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
            <>
              <form>
                <input
                  type='file'
                  // value={selectedFile}
                  onChange={(e) => setNewItemPic(e.target.files[0])}
                />
              </form>
              <Button variant='primary' onClick={uploadPicHandler}>
                Upload Photo
              </Button>
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
            </>
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
