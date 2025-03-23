import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { useSelector } from "react-redux";
import DashboardIcon from '@mui/icons-material/Dashboard';

const Sidebar = () => {
  const [currentOpenMenu, setCurrentOpenMenu] = useState(null); // Track currently open menu
  const [isSidebarClosed, setIsSidebarClosed] = useState(false); // Track sidebar state
  const location = useLocation(); // Get the current route location
  const userData = useSelector((state) => state.auth.userData);

  // Define all menu items
  const allMenuItems = [
    { path: "/dashboard", icon: "fas fa-th-large", name: "Dashboard" },
    { path: "/home", icon: "fas fa-th-large", name: "Home" },
    { path: "/services", icon: "fas fa-th-large", name: "Services" },
    { path: "/business-tax", icon: "fas fa-th-large", name: "Business Tax" },
    { path: "/online-tax-return", icon: "fas fa-th-large", name: "Online Tax Return" },
    // { path: "/pay-calculator", icon: "fas fa-th-large", name: "Pay Calculator" },
    // { path: "/pricing-plan", icon: "fas fa-th-large", name: "Pricing Plan" },
    // { path: "/blog", icon: "fas fa-th-large", name: "Blog" },
    { path: "/contact-us", icon: "fas fa-th-large", name: "Contact Us" },
    { path: "/about-us", icon: "fas fa-th-large", name: "About Us" },
    { path: "/terms-conditions", icon: "fas fa-th-large", name: "Terms & Conditions" },
    { path: "/privacy-policy", icon: "fas fa-th-large", name: "Privacy Policy" },
    { path: "/refund-policy", icon: "fas fa-th-large", name: "Refund Policy" },
    { path: "/profile", icon: "fas fa-th-large", name: "Profile" },
  ];

  // Filter menu items based on userData
  const filteredMenuItems = userData && userData.data.logintype === 1 ? allMenuItems.filter(item => item.name !== "Profile") : allMenuItems.filter(item => item.name === "Profile");

  useEffect(() => {
    // Select all elements with the class ".rightMenu" and ".anotherRightMenu"
    const rightMenus = document.querySelectorAll(".rightMenu, .anotherRightMenu");

    // Function to handle rightMenu clicks
    const handleRightMenuClick = (e) => {
      const rightMenuParent = e.target.closest("li"); // Find the closest <li> ancestor
      if (rightMenuParent !== currentOpenMenu) {
        // Close the currently open menu (if any)
        if (currentOpenMenu !== null) {
          currentOpenMenu.classList.remove("showMenu");
        }
        // Open the clicked menu
        rightMenuParent.classList.toggle("showMenu");
        // Update the currentOpenMenu
        setCurrentOpenMenu(rightMenuParent);
      } else {
        // Toggle the clicked menu if it's already open
        rightMenuParent.classList.toggle("showMenu");
        // Reset currentOpenMenu
        setCurrentOpenMenu(null);
      }
    };

    // Add event listeners to each rightMenu
    rightMenus.forEach((menu) => {
      menu.addEventListener("click", handleRightMenuClick);
    });

    // Cleanup function to remove event listeners
    return () => {
      rightMenus.forEach((menu) => {
        menu.removeEventListener("click", handleRightMenuClick);
      });
    };
  }, [currentOpenMenu]);

  useEffect(() => {
    // Close the rightMenu when clicking outside of it
    const handleDocumentClick = (e) => {
      const rightMenus = document.querySelectorAll(".rightMenu, .anotherRightMenu");
      let isClickInsideRightMenu = false;
      rightMenus.forEach((menu) => {
        if (menu.contains(e.target)) {
          isClickInsideRightMenu = true;
        }
      });
      if (!isClickInsideRightMenu && currentOpenMenu !== null) {
        currentOpenMenu.classList.remove("showMenu");
        setCurrentOpenMenu(null);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [currentOpenMenu]);

  useEffect(() => {
    // Toggle sidebar visibility
    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".fa-angle-double-left");

    const handleSidebarClick = () => {
      sidebar.classList.toggle("close");
      document.body.classList.toggle("closeMenu"); // Adding or toggling a class on the body
      setIsSidebarClosed((prev) => !prev); // Update sidebar state
    };

    if (sidebarBtn) {
      sidebarBtn.addEventListener("click", handleSidebarClick);
    }

    // Cleanup function to remove event listener
    return () => {
      if (sidebarBtn) {
        sidebarBtn.removeEventListener("click", handleSidebarClick);
      }
    };
  }, []);

  return (
    <div className="sidebar">
      <ul className="nav-links">
        {filteredMenuItems.map((item, index) => (
          <li
            key={index}
            className={location.pathname === item.path ? "active" : ""} // Highlight active menu
          >
            <Link to={item.path}>
              <i className={item.icon}></i>
              <span className="link_name">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;