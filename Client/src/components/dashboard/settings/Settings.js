import React,{useState} from 'react'
import './settings.css';
import Button from 'react-bootstrap/Button'
import EditPasswordForm from './EditPasswordForm';
import RemoveAccountForm from './RemoveAccountForm';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../header/Header';
import SidePannel from '../sidepannel/SidePannel';
function Settings() {

    const[isEditPasswordFOrmOpened,setEditPasswordFormOpened]=useState(false);
    const[isRemoveFOrmOpened,setRemoveFormOpened]=useState(false);
    const[isDarkModeOn,setDarkMode]=useState(document.body.style.backgroundColor=='white'?true:false);
    console.log(document.body.style.backgroundColor==='white',"AAAA")
    const handleEditButton=()=>{
        setEditPasswordFormOpened(!isEditPasswordFOrmOpened)
    }
    const handleRemoveButton=()=>{
        setRemoveFormOpened(!isRemoveFOrmOpened)
    }
    const handleTheme=()=>{
        setDarkMode(!isDarkModeOn);
        document.body.style.backgroundColor = isDarkModeOn?'white':'black';
    }
    return (
        <>
        <Header />
            <div>
                <Container fluid>
                    <Row>
                        <Col sm={2}>
                            <div style={{ top: '600px' }}>
                                <SidePannel />
                            </div>

                        </Col>
                        <Col sm={10}>
                        <div style={{ position: 'relative', top: '100px' }}>
                            <div style={{padding: '50px 0px 0px 0px' }}>
                                <span>Dark Mode</span>
                                <label class="switch">
                                <input checked={isDarkModeOn} onChange={handleTheme} type="checkbox"/>
                                <span class="slider round">
                                </span>
                                </label>
                            </div>
                            <div style={{padding: '50px 0px 0px 0px' }}>
                                <span>Change Password</span>
                                <span style={{align: 'right'}}>
                                    <Button variant={isEditPasswordFOrmOpened ? 'danger':'primary'} onClick={handleEditButton}>
                                        {isEditPasswordFOrmOpened?'Close':'Edit'}
                                    </Button>
                                    </span>
                                {isEditPasswordFOrmOpened?<EditPasswordForm/>:null}
                            </div>
                            <div style={{padding: '50px 0px 0px 0px' }}>
                                <span>Remove Account</span>
                                <span style={{align: 'right'}}>
                                    <Button variant={isRemoveFOrmOpened ? 'danger':'primary'} onClick={handleRemoveButton}>
                                        {isRemoveFOrmOpened?'Close':'Remove'}
                                    </Button>
                                    </span>
                                {isRemoveFOrmOpened?<RemoveAccountForm/>:null}
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
                </>
                        
    )
}

export default Settings
