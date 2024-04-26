import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button, Spinner } from 'react-bootstrap';
import DataTable from "react-data-table-component"
import { getStatistic } from '../../http/levelAPI';

const UserStat = observer(({ data, show, onHide }) => {

    var [statistic, setStatistic] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            getStatistic(data.id).then((data1) => setStatistic(data1.data)).finally(() => setLoading(false))
        }, 1000)
    }, []);
    if (loading) {
        return (
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Spinner animation={"grow"} role='status' />
            </div>
        )
    }

    const columns = [
        { name: "Задание", selector: 'name', sortable: true },
        { name: "Статус", selector: 'tokenStatus', sortable: true },
        { name: "Дата выполнения", selector: 'passDate', sortable: true },
        { name: "Время выполнения задания", selector: 'timeForLevel', sortable: true },
    ]

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Статистика пользователя {data.user_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Статистика прохождения испытаний
                <DataTable
                    columns={columns}
                    data={statistic}
                    pagination
                    highlightOnHover
                    responsive
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UserStat