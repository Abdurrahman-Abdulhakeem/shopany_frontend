import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../redux/cartSlice";

function Modal({ children, text }) {
  const modalRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      modalRef.current &&
        !modalRef.current.contains(event.target) &&
        dispatch(closeModal());
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <div className="modal-container">
      <div className="setModal">
        <div className="modal" ref={modalRef}>
          <div>
            <span role="button" onClick={() => dispatch(closeModal())}>
              &times;
            </span>
            <p>{text}</p>
            <button className=" btn" onClick={() => dispatch(closeModal())}>
              Cancel
            </button>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
