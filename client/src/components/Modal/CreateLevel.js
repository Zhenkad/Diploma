import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";

const CreateLevel = ({show, onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить испытание
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control className="mt-3 mb-3" placeholder={"Введите название испытания"}/>
                    <Form.Control className="mt-3 mb-3" placeholder={"Введите порт испытания"}/>
                    <Form.Control className="mt-3 mb-3" type="file"/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={onHide}>Добавить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateLevel;