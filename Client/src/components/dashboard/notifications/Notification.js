import React, { useState, useRef } from 'react'
import './notifications.css'
import { NotificationData } from '../Utils/Notifications'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Notification(props) {
  const [isRead, setIsRead] = useState('#aeb9f7');
  const handleReadAll = () => {
    setIsRead('#d8dbf0');
  }
  console.log(props)
  return (
    <nav className={props.openNotification ? 'notification-menu active' : 'notification-menu'}>
      <h2 class='notificationheading'>Notifications</h2>
      <h2 class='notificationsubheading'><Link onClick={handleReadAll}>Mark as read</Link></h2>
      {NotificationData.map((item, index) => {
        return (
          <Card style={{ height: '120px', background: `${isRead}` }}>
            <span>{item.text}</span>
          </Card>

        )
      })}
    </nav>
  )
}

export default Notification;
