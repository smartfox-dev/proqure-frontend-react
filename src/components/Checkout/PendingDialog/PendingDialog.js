import { useEffect, useState } from "react";
import "./PendingDialog.css"
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import headerImg from "../../../assets/images/header.png";
import { updateDateTimeFormat } from "../../../utils";

const style = {
  position: "fixed", // Use fixed position for the modal
  top: "55%", // Set top position to 50%
  left: "50%", // Set left position to 50%
  transform: "translate(-50%, -50%)", // Use translate to center the modal
  minWidth: "450px",
  width: "650px",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #04AA6D",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
};

const ConfirmDialog = ({ open, handleConfirm, handleClose }) => {
  const pendingList = useSelector((state) => state.category.pendingList);
  const statusLetter = (status) => {
    if(status === 1){
      return "Received"
    }
    else if(status === 2){
      return "Processing"
    }
    else if(status === 3){
      return "Shipped"
    }
    else if(status === 4) {
      return "Delivered"
    }
    else{
      return "Received"
    }
  } 
  const handleDetail = (item) => {
    console.log("item:", item)
  }
  useEffect(() => {
    console.log("pendingList", pendingList)

  }, [])
  
  return (
    <Modal open={open} /*onClose={handleModalClose} */>
      <Box sx={style} className="pendingmodalbody">
        <div className="d-flex justify-content-center align-items-center">
          <div className="pendingmodalclose" onClick={handleClose}>
            <CloseIcon />
          </div>
          <div className="pendingmodalimg">
            <img src={headerImg} alt="" />
          </div>
        </div>
        <div className="pendingpcontainter">
          <table>
            <tr>
              <th>Order Id</th>
              <th>Ordered Date</th>
              <th>Shipping</th>
              <th>Total Money</th>
              <th>Progressing</th>
            </tr>
            {pendingList &&
              pendingList.map((item, index) => (
                <tr key={index} className="pendingitemrow" onClick={(e) => {handleDetail(item)}}>
                  <td>{item.id}</td>
                  <td>{updateDateTimeFormat(item.created_at)}</td>
                  <td>{item.shipping}</td>
                  <td>{item.totalAmount}</td>
                  <td>
                    <span className="progressclass">{statusLetter(item.status)}</span>
                  </td>
                </tr>
              ))}
          </table>
        </div>
        <div className="pendingpmodalbuttonroot">
          <button className="pendingmodalbutton" onClick={handleClose}>
            DONE
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmDialog;  
