import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button, Spinner, Row, Col, Form } from 'react-bootstrap';
import DataTable from "react-data-table-component"
import { getStatistic } from '../../http/levelAPI';

const UserStat = observer(({ data, show, onHide }) => {

    const [statistic, setStatistic] = useState([])
    var [countOfPassedLevels, setCountOfPassedLevels] = useState(0) // Инициализируйте countOfPassedLevels внутри useEffect

    useEffect(() => {
        getStatistic(data.id).then((data1) => {
            setStatistic(data1.data)
            // Обновите countOfPassedLevels после получения данных
            setCountOfPassedLevels(data1.data.filter((st) => st.tokenStatus === 1).length)
        })
    }, [data.id]);
    if (statistic.length === 0) {
        return (
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Spinner animation={"grow"} role='status' />
            </div>
        )
    }

    const columns = [
        { name: "Задание", selector: 'name', sortable: true },
        {
            name: "Статус",
            selector: 'tokenStatus',
            sortable: true,
            cell: (row) => {
                if (row.tokenStatus === 'Выполнено') {
                    return <span className="badge bg-success">Выполнено</span>;
                } else {
                    return <span className="badge bg-danger">Не выполнено</span>;
                }
            }
        },
        { name: "Дата выполнения", selector: 'passDate', sortable: true },
        { name: "Время выполнения задания", selector: 'timeForLevel', sortable: true },
    ]

    statistic.forEach(st => {
        if (st['tokenStatus'] === 1) {
            st['tokenStatus'] = 'Выполнено'
        } else if (st['tokenStatus'] === 0) {
            st['tokenStatus'] = 'Не выполнено'
        }
    });

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
                <Row>
                    <Col xs={12} sm={6}>
                        Кол-во выполненых заданий
                        <Form.Control type="text" placeholder={countOfPassedLevels + '/' + statistic.length} readOnly />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UserStat