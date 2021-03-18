import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {AiOutlinePlus, AiFillCaretDown, AiFillCaretLeft} from 'react-icons/ai';
import {FaBell} from 'react-icons/fa';
import {IoMdText} from 'react-icons/io';
import {BsGearFill} from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group';

function App() {
  return (
    <Navbar>
      <NavItem icon={<AiOutlinePlus />} />
      <NavItem icon={<FaBell />} />
      <NavItem icon={<IoMdText />} />

      <NavItem icon={<AiFillCaretDown />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
};

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
};

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  };

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition 
        in={activeMenu === 'main'} 
        timeout={500}
        classNames="menu-primary"
        unmountOnExit 
        onEnter={calcHeight}>
          <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem 
          leftIcon={<BsGearFill />}
          rightIcon={<BsGearFill />}
          goToMenu="settings"
          >
            Settings</DropdownItem>
          </div>
      </CSSTransition>

      <CSSTransition 
        in={activeMenu === 'settings'} 
        timeout={500}
        unmountOnExit 
        classNames="menu-secondary"
        onEnter={calcHeight}>
          <div className="menu">
          <DropdownItem 
            goToMenu='main' 
            leftIcon={<AiFillCaretLeft />}>
              <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          </div>
      </CSSTransition>
    </div>
  );
};

export default App;
