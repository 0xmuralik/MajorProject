import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg';

export const SidebarData = [
  {
    id:'home',
    title: 'Home',
    path: '/dashboard',
    children:[],
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    id:'yourresearches',
    title: 'Your Researches',
    path: '/self',
    children:[
      {
        title:'Completed',
        path:'/self/completed',
        children:[],
        icon:<IoIcons.IoIosDoneAll/>,
        cName: 'nav-text'
      },
      {
        title:'Pending',
        path:'/self/pending',
        children:[],
        icon:<AiIcons.AiOutlineQuestion/>,
        cName: 'nav-text'
      }
    ],
    icon: <IoIcons.IoMdPhotos />,
    cName: 'nav-text'
  },
  {
    id:'saved',
    title: 'Saved',
    path: '/saved',
    children:[
      {
        title:'Completed',
        path:'/saved/completed',
        children:[],
        icon:<IoIcons.IoIosDoneAll/>,
        cName: 'nav-text'
      },
      {
        title:'Pending',
        path:'/saved/pending',
        children:[],
        icon:<AiIcons.AiOutlineQuestion/>,
        cName: 'nav-text'
      }
    ],
    icon: <FaIcons.FaSave />,
    cName: 'nav-text'
  },
  {
    id:'communities',
    title: 'Communities',
    path: '/communities',
    children:[],
    icon: <CgIcons.CgCommunity />,
    cName: 'nav-text'
  },
  {
    id:'support',
    title: 'Support',
    path: '/support',
    children:[],
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  
  
];