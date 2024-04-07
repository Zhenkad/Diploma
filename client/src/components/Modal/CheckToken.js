import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, FormControl, Modal, ModalBody } from 'react-bootstrap';

const CheckToken = observer(({ show, onHide }) => {
    const [token, setToken] = useState('')

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ввести ключ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl value={token} onChange={e => setToken(e.target.value)} className="mt-3 mb-3" placeholder={"Введите ключ (строка из 12 символов)"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={onHide}>Отправить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CheckToken