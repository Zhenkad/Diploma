import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../http/userApi';
import { observer } from "mobx-react-lite";
import { Spinner, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component"
import EditUser from './Modal/EditUser';
import DeleteUser from './Modal/DeleteUser';
import UserStat from './Modal/UserStat';

const UserBar = observer(() => {

    var [users, setUsers] = useState([])
    const [editUserView, setEditUserView] = useState(false)
    const [deleteUserView, setDeleteUserView] = useState(false)
    const [userStatView, setUserStatView] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            fetchUsers().then((data) => setUsers(data.data)).finally(() => setLoading(false))
        }, 1000)
    }, []);
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
                        <button onClick={() => handleOpenModal(row, 1)} style={{ marginRight: "5px" }} className="btn btn-primary btn-sm bi bi-pencil-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Редактировать"></button>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                        <button onClick={() => handleOpenModal(row, 2)} style={{ marginRight: "5px" }} className="btn btn-primary btn-sm bi bi-eye-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Статистика"></button>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                        <button onClick={() => handleOpenModal(row, 3)} style={{ marginRight: "5px" }} className="btn btn-danger btn-sm bi bi-trash3-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Удалить"></button>
                    </Col>
                </Row>
            )},
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