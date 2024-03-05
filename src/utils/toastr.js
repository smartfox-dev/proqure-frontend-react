import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateToastr = () => {
  const customToastStyle = {
    top: '150px', // Set the y position of the toast
    width:'auto',
  };
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={customToastStyle}
        closeButton={<CustomCloseButton />}
      />
    </div>
  );
}

export default CreateToastr

export const toastr = {
  success: (message, delay = 1000) => {
    setTimeout(() => {
      toast.success(message + "!");
    }, delay);
  },
  warning: (message, delay = 1000) => {
    setTimeout(() => {
      toast.warning(message + "!");
    }, delay);
  },
  error: (message, delay = 1000) => {
    setTimeout(() => {
      toast.error(message + "!");
    }, delay);
  },
  info: (message, delay = 1000) => {
    setTimeout(() => {
      toast.info(message + "!");
    }, delay);
  },
};

const CustomCloseButton = ({ closeToast, type }) => {
  let buttonColor;
  
  switch (type) {
    case "success":
      buttonColor = "#4CAF50";
      break;
    case "warning":
      buttonColor = "#FFC107";
      break;
    case "error":
      buttonColor = "#F44336";
      break;
    case "info":
      buttonColor = "#2196F3";
      break;
    default:
      buttonColor = "#4CAF50";
  }

  return (
    <button
      onClick={closeToast}
      style={{
        backgroundColor: buttonColor,
        border: "none",
        color: "white",
        padding: "0px 15px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        margin: "4px 2px",
        cursor: "pointer",
        borderRadius: "5px",
      }}
    >
      Ok
    </button>
  );
};