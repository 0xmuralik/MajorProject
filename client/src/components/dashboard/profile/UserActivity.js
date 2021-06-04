import React from 'react'
import Card from 'react-bootstrap/Card';
import { UserActivityDetails } from '../Utils/UserActivity';

function UserActivity() {
    return (
        <div class='pad'>

            <h3>Activity</h3>
            {UserActivityDetails.map((item, index) => (
                <div class='pad'>
                    <Card>
                        <Card.Body style={{ background: '#d8dbf0' }}>
                            <Card.Title>{item.date}</Card.Title>
                            {item.activity.map((innerItem, index) => (
                                <div class='activity'>
                                    {innerItem.heading}
                                    <br />
                                    {innerItem.subHeading}
                                    <hr />
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default UserActivity;
