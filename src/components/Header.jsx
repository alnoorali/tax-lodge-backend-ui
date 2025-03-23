import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <header>
      <div className="left">
        <div className="icon"><i className='fas fa-angle-double-left'></i></div>
        <span className="text">Tax Lodge Online</span>
      </div>
      <div className="right">
        <ul className="navbar-nav">
          {/* <li className="nav-item dropdown notificationList">
            <a className="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <div className="icon">
                <i className="fas fa-bell"></i>
                <span>2</span>
              </div>
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a className="dropdown-item" href="#">
                  <span className="text">Company Name</span>
                  <div className="dateTime">
                    <span>04:30pm</span>
                    <span>11/02/2024</span>
                  </div>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="text">Company Name</span>
                  <div className="dateTime">
                    <span>04:30pm</span>
                    <span>11/02/2024</span>
                  </div>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="text">Company Name</span>
                  <div className="dateTime">
                    <span>04:30pm</span>
                    <span>11/02/2024</span>
                  </div>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="text">Company Name</span>
                  <div className="dateTime">
                    <span>04:30pm</span>
                    <span>11/02/2024</span>
                  </div>
                </a>
              </li>
            </ul>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" href="#">
              <div className="icon">
                <i className="fas fa-cog"></i>
              </div>
            </a>
          </li> */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="assets/img/logo.svg" alt="" />
              <div className="text">{userData.data.username}</div>
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a className="dropdown-item" href="#">
                    <div className="icon">
                        <i className="fas fa-key"></i>
                    </div>
                    <span className="text">Change Password</span>
                </a>
                </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                    <div className="icon">
                    <i className="fas fa-sign-out-alt"></i>
                    </div>
                    <span className="text">Logout</span>
                </a>
                </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;