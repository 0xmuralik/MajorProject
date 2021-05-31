import React, { useState, useEffect } from 'react'
import './DiscussionForum.css'
import * as GoIcons from 'react-icons/go'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CommentBox = ({ parent_id, class_list }) => {
    console.log(parent_id,'------parent-id---------')
    const [comments, setcomments] = useState([])
    const [displaySubCommentForm, setdisplaySubCommentForm] = useState(false)
    const [displaySubCommentList, setdisplaySubCommentList] = useState(false)
    const [formsubmited, setformsubmited] = useState(false)
    const [subcommentFormParentId, setsubcommentFormParentId] = useState(null)
    const [replyComment,setreplyComment]=useState("")

    useEffect(async() => {
        await axios.get('http://localhost:5000/discussionforum/'+parent_id,{
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).data.token}`,
            },
        })
        .then(response => {
            setcomments(response.data)
            setdisplaySubCommentList(true)
        })
    }, [])

    const onsubmit=(e,field_id)=>{
        setdisplaySubCommentList(false)
        e.preventDefault()
        axios.post('http://localhost:5000/discussionforum/'+field_id+'/newcomment',
            {message:replyComment},
            {headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("profile")).data.token}`}}            
        ).then(response=>{
            console.log(response.data,'===========================')
            setdisplaySubCommentList(true)
            setformsubmited(true)
        })
        // subCommentReplyIDList({field_ids,replyComment})
        setreplyComment('')
    }
    // const addId=(x,id)=>{
    //     subCommentReplyIDList({field_ids:[id,...x.field_ids],replyComment:x.replyComment})
    // }

    return (
        <>
            <ul id="comments-list" class={class_list}>
                {comments.map((field) => (
                    <>
                        <li>
                            <div class="comment-main-level">
                                <div class="comment-avatar">
                                    <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" />
                                </div>
                                <div class="comment-box">
                                    <div class="comment-head">
                                        <h6 class="comment-name by-author">
                                            <a href="http://creaticode.com/blog">{field.commentor}</a>
                                        </h6>
                                        <span>{field.time}</span>
                                        <span>
                                            <GoIcons.GoChevronUp /> {field.upvote.length > 0 && field.upvote.length} 
                                        |  <GoIcons.GoChevronDown /> {field.downvote.length > 0 && field.downvote.length} 
                                        • <Link onClick={() => {
                                            setdisplaySubCommentForm(!displaySubCommentForm) 
                                            setsubcommentFormParentId(field._id)
                                            }} >reply</Link> 
                                        </span>
                                        <i class="fa fa-reply"></i>
                                        <i class="fa fa-heart"></i>
                                    </div>
                                    <div class="comment-content">
                                        {field.comment}
                                    </div>
                                    <div class="reply-box" >
                                        {displaySubCommentForm  && field._id==subcommentFormParentId? 
                                        <Form onSubmit={(e)=>onsubmit(e,field._id)}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Control as="textarea" rows={1} value={replyComment} onChange={(e)=>setreplyComment(e.target.value)} />
                                            </Form.Group>
                                            <Button variant="primary" type="submit" size="sm">
                                                Submit
                                            </Button>
                                        </Form> : null}
                                    </div>
                                </div>
                            </div>
                            {formsubmited||(field.subComments.length > 0 && displaySubCommentList ) ?
                             <CommentBox parent_id={field._id} class_list={"comments-list" + " reply-list"} /> : null}
                        </li>
                    </>
                ))}
            </ul>
        </>
    )
}

export default CommentBox