import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FormControl, Modal, Button } from 'react-bootstrap';
import { passLevel } from '../../http/levelAPI';

const CheckToken = observer(({ show, onHide, levelId, userId }) => {
    const [token, setToken] = useState('');

    const checkToken = async () => {
        console.log(token)
        console.log(levelId)
        console.log(userId)
        try {
            await passLevel(userId, levelId, token).then(alert("Задание выполнено")).then(window.location.reload())
        }
        catch (e) {
            alert(e.response.data.message)
        }
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
                    Ввести ключ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl value={token} onChange={e => setToken(e.target.value)} className="mt-3 mb-3" placeholder={"Введите ключ (строка из 12 символов)"} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"success"} onClick={checkToken}>Отправить</Button>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CheckToken