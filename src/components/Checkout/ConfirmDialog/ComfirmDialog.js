import "./ConfirmDialog.css"
import Modal from "@mui/material/Modal";

const ConfirmDialog = ({ header, content,  open, handleConfirm, handleClose }) => {
  return (
    <Modal open={open}>
      <div className="confirmdialog confirm">
        <div className="confirm-content">
          <h4>CONFIRM</h4>
          <div>
            <h2>{header}</h2>
            <p>{content}</p>
          </div>
        </div>
        <div className="confirm-btns">
          <button onClick={() => handleConfirm(true)}>YES</button>
          <button onClick={() => handleClose(false)}>NO</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;  
