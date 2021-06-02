import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from '../Utils/SidebarData';
import './SidePannel.css';
import SidePannelButtons from './SidePannelButtons';

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
            <SidePannelButtons item={item} index={index} />
          );
        })}
      </div>
    </nav>


  );
}

export default SidePannel;