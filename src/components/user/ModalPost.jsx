import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcode from 'react-daum-postcode';

const ModalPost = ({onPostCode}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onCompleted = (e) => {
        //console.log(e);
        const address=e.address;
        const buliding=e.bulidingName && `(${e.bulidingName})`;
        onPostCode(address + buliding);
        handleClose();
    }

    return (
        <>
          <Button variant="primary" onClick={handleShow}>
            주소검색
          </Button>
    
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>주소검색</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DaumPostcode onComplete={(e)=>onCompleted(e)}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary">Understood</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }

export default ModalPost