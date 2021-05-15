import React from 'react'
import { Link } from 'react-router-dom';
import './SidePannel.css';
import ListGroup from 'react-bootstrap/ListGroup';
function SidePannelButtons(props) {

    const toggleHref = `#${props.item.id}`
    const link = props.item.children.length!=0?
    <a data-toggle="collapse"  href={toggleHref}>
        {props.item.icon}
    <span>{props.item.title}</span></a>:
    <Link to={props.item.path}>
        {props.item.icon}
        <span>{props.item.title}</span>
    </Link>
    return (
        console.log(props.item),
        <li key={props.index} className={props.item.cName}>
                  {link}
                  <div id={props.item.id} class="collapse">
                  <ListGroup>
                      {props.item.children.map((child,index)=>{
                          return(
                              <SidePannelButtons item={child} index={index}/>
                          )
                      })}
                  </ListGroup>
                  </div>
        </li>

    )
}

export default SidePannelButtons
