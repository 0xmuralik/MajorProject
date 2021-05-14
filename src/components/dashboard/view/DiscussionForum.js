import { React, useState } from 'react'
import './DiscussionForum.css'
import CommentBox from "./CommentBox";
import { Form, Button } from 'react-bootstrap'


const DiscussionForum = ({ discussion_form }) => {
    const [comments, setComments] = useState(discussion_form)
    var comments_copy=[...comments]

    const [comment, setcomment] = useState('')
    const [time, settime] = useState("")
    const [upvotes, setupvotes] = useState(0)
    const [downvotes, setdownvotes] = useState(0)
    const [name, setname] = useState("")
    const [subcomment, setsubcomment] = useState([])
    const [user_id, setuser_id] = useState(0)
    const [id, setid] = useState('')

    const addComment =(data)=>{
        //add
        const newcomment={id: Math.floor(Math.random()*10000)+"1",...data}
        setComments([newcomment,...comments])

        console.log(newcomment)

        setcomment('')
        settime("")
        setupvotes(0)
        setdownvotes(0)
        setname("")
        setsubcomment([])
        setuser_id(0)
        setid('')
    }

    const addSubcomment=(x)=>{
        console.log(x,'-------+++----')
        
        const list=x.field_ids
        const data = {
            name: "new",
            time: "just now",
            user_id: 12,
            upvotes: 0,
            downvotes: 0,
            comment: x.replyComment,
            subcomment: []
        }
        const newcomment={id: Math.floor(Math.random()*10000)+"1",...data}
        
        //send (list,newcomment) to api 
        //and get new set of comments and do setComments

    }    

    const onsubmit = (e) => {
        e.preventDefault()

        if (!comment) {
            alert('Type message')
            return
        }
        const data = {
            name: "new",
            time: "just now",
            user_id: 12,
            upvotes: 0,
            downvotes: 0,
            comment: comment,
            subcomment: []
        }
        addComment(data)
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
                <CommentBox comments={comments_copy} class_list={"comments-list"} subCommentReplyIDList={addSubcomment}/>
            </div>

        </div>
    )
}

export default DiscussionForum
