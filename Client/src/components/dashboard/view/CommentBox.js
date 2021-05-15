import React, { useState } from 'react'
import './DiscussionForum.css'
import * as GoIcons from 'react-icons/go'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CommentBox = ({ comments, class_list, subCommentReplyIDList }) => {

    const [displaySubCommentForm, setdisplaySubCommentForm] = useState(false)
    const [replyComment,setreplyComment]=useState("")

    const onsubmit=(e,field_id)=>{
        e.preventDefault()
        const field_ids=[field_id]
        subCommentReplyIDList({field_ids,replyComment})
        setreplyComment('')
    }
    const addId=(x,id)=>{
        subCommentReplyIDList({field_ids:[id,...x.field_ids],replyComment:x.replyComment})
    }

    return (
        <>
            <ul id="comments-list" class={class_list}>
                {comments.map((field) => (
                    <>
                        {/* <DisplayField readOnly={readOnly} name={field.name} value={field.value} type={field.type} /> */}
                        <li>
                            <div class="comment-main-level">
                                <div class="comment-avatar">
                                    <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" />
                                </div>
                                <div class="comment-box">
                                    <div class="comment-head">
                                        <h6 class="comment-name by-author">
                                            <a href="http://creaticode.com/blog">{field.name}</a>
                                        </h6>
                                        <span>{field.time}</span>
                                        <span><GoIcons.GoChevronUp /> {field.upvotes > 0 && field.upvotes} |  <GoIcons.GoChevronDown /> {field.downvotes > 0 && field.downvotes} • <Link onClick={() => { setdisplaySubCommentForm(!displaySubCommentForm) }} >reply</Link> </span>
                                        <i class="fa fa-reply"></i>
                                        <i class="fa fa-heart"></i>
                                    </div>
                                    <div class="comment-content">
                                        {field.comment}
                                    </div>
                                    <div class="reply-box" >
                                        {displaySubCommentForm ? 
                                        <Form onSubmit={(e)=>onsubmit(e,field.id)}>
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
                            {field.subcomment.length > 0 ? <CommentBox comments={field.subcomment} class_list={"comments-list" + " reply-list"} 
                            subCommentReplyIDList={(x)=>addId(x,field.id)} /> : <></>}
                        </li>
                    </>
                ))}
            </ul>
        </>
    )
}

export default CommentBox
