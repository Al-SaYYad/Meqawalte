/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import "./DropdownMenu.css";

const DropdownMenu = ({ icon, label, items }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (open) {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="dropdown-menu-container" ref={dropdownRef}>
      <button className="dropdown-trigger" onClick={() => setOpen(!open)}>
        <span className="dropdown-icon">{icon}</span>
        <span className="dropdown-label">{label}</span>
      </button>
      {open && (
        <div className="dropdown-menu-content">
          {items.length === 0 ? (
            <h2 className="no-data">لم توجد بيانات بعد</h2>
          ) : (
            items.map((item, index) => (
              <div key={index} className="dropdown-item">
                <div className="text">
                  <h3>{item.name}</h3>
                  <h4>{item.title}</h4>
                  <p>{item.price} ج</p>
                </div>
                <div className="image">
                  <img src={item.img} alt="Card Image" />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
