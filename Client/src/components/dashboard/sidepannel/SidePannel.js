import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from '../Utils/SidebarData';
import './SidePannel.css';
import { IconContext } from 'react-icons';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container';
import SidePannelButtons from './SidePannelButtons';
import ListGroup from 'react-bootstrap/ListGroup';

function SidePannel() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    // console.log({SidebarData}),
    
 
        <nav className={true ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='/upload' className='menu-bars'>
                <FaIcons.FaUpload />
              </Link>
            </li>
            </ul>
            <div class="panel-group">
            {SidebarData.map((item, index) => {
              return (
                <SidePannelButtons item={item} index={index}/>
              );
            })}
          </div>
        </nav>
   
      
  );
}

export default SidePannel;