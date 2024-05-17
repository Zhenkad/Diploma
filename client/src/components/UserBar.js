import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../http/userApi';
import { observer } from "mobx-react-lite";
import { Spinner, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component"
import EditUser from './Modal/EditUser';
import DeleteUser from './Modal/DeleteUser';
import UserStat from './Modal/UserStat';
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UserBar = observer(() => {

    var [users, setUsers] = useState([])
    const [editUserView, setEditUserView] = useState(false)
    const [deleteUserView, setDeleteUserView] = useState(false)
    const [userStatView, setUserStatView] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [loading, setLoading] = useState(true)

    const tooltipEdit = (
        <Tooltip id="tooltipEdit">
            Редактировать
        </Tooltip>
    );

    const tooltipDelete = (
        <Tooltip id="tooltipDelete">
            Удалить
        </Tooltip>
    );

    const tooltipStat = (
        <Tooltip id="tooltipStat">
            Статистика
        </Tooltip>
    );

    useEffect(() => {
        setTimeout(() => {
            fetchUsers().then((data) => setUsers(data.data)).finally(() => setLoading(false))
        }, 1000)
    });
    if (loading) {
        return (
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Spinner animation={"grow"} role='status' />
            </div>
        )
    }

    const handleOpenModal = (data, modalNumber) => {
        setSelectedData(data)
        if (modalNumber === 1) {
            setEditUserView(true)
        } else if (modalNumber === 2) {
            setUserStatView(true)
        } else if (modalNumber === 3) {
            setDeleteUserView(true)
        }
    }

    const columns = [
        { name: 'ID', selector: 'id', sortable: true },
        { name: 'Имя пользователя', selector: 'user_name', sortable: true },
        { name: 'Номер телефона', selector: 'phone_number' },
        { name: 'Роль', selector: 'role', sortable: true },
        {
            name: 'Администрирование', cell: row => (
                <Row>
                    <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                        <OverlayTrigger overlay={tooltipEdit} placement="top">
                            <Button variant="primary" onClick={() => handleOpenModal(row, 1)} style={{ marginRight: "5px" }} size="sm">
                                <MdEdit />
                            </Button>
                        </OverlayTrigger>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                        <OverlayTrigger overlay={tooltipStat} placement="top">
                            <Button variant="primary" onClick={() => handleOpenModal(row, 2)} style={{ marginRight: "5px" }} size="sm">
                                <FaEye />
                            </Button>
                        </OverlayTrigger>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                        <OverlayTrigger overlay={tooltipDelete} placement="top">
                            <Button variant="danger" onClick={() => handleOpenModal(row, 3)} style={{ marginRight: "5px" }} size="sm">
                                <MdDelete />
                            </Button>
                        </OverlayTrigger>
                    </Col>
                </Row>
            )
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={users}
                pagination
                highlightOnHover
                responsive
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            />
            {editUserView && <EditUser data={selectedData} show={editUserView} onHide={() => setEditUserView(false)} />}
            {userStatView && <UserStat data={selectedData} show={userStatView} onHide={() => setUserStatView(false)} />}
            {deleteUserView && <DeleteUser data={selectedData} show={deleteUserView} onHide={() => setDeleteUserView(false)} />}
        </div>
    )
});

export default UserBar;