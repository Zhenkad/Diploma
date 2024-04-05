import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import {observer} from "mobx-react-lite"
import { createLevel, createTokensForAllUsers } from '../../http/levelAPI';

const CreateLevel = observer(({show, onHide}) => {
    const [name, setName] = useState('')
    const [port, setPort] = useState('')
    const [file, setFile] = useState(null)
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const  addLevel = async () => {
        let newLevel
        const formData = new FormData()
        formData.append('name', name)
        formData.append('port', port)
        formData.append('img', file)
        await createLevel(formData).then(data => onHide())
    }

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
                    <Form.Control value={name} onChange={e => setName(e.target.value)} className="mt-3 mb-3" placeholder={"Введите название испытания"}/>
                    <Form.Control value={port} onChange={e => setPort(e.target.value)} className="mt-3 mb-3" placeholder={"Введите порт испытания"}/>
                    <Form.Control className="mt-3 mb-3" type="file" onChange={selectFile}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={addLevel}>Добавить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateLevel;