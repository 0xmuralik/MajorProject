import { React, useState, useEffect } from 'react'
import './DiscussionForum.css'
import CommentBox from "./CommentBox";
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const DiscussionForum = ({ discussion_form_id }) => {
    const [parentId, setparentId] = useState(discussion_form_id)
    const [comment, setcomment] = useState('')
    const [displayCommentList, setdisplayCommentList] = useState(false)

    useEffect(() => {
        setdisplayCommentList(true)
    }, [])

    const onsubmit = (e) => {
        e.preventDefault()
        setdisplayCommentList(false)
        axios.post('/discussionforum/' + discussion_form_id + '/newcomment',
            { message: comment },
            { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).data.token}` } }
        ).then(response => {
            console.log(response.data, '===========================')
            setdisplayCommentList(true)
        })
        setcomment('')
    }


    return (
        <div>
            <div class="reply-box">
                <Form onSubmit={onsubmit}>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control as="textarea" rows={1} value={comment} onChange={(e) => setcomment(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" size="sm">
                        Submit
                    </Button>
                </Form>
            </div>
            <div class="comments-container">
                {console.log(discussion_form_id + "in formmmmmmmmm")}
                {displayCommentList ? <CommentBox parent_id={parentId} class_list={"comments-list"} /> : null}
            </div>
        </div>
    )
}

export default DiscussionForum

