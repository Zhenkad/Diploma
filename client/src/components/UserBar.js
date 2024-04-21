import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../http/userApi';
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component"
import EditUser from './Modal/EditUser';
<<<<<<< HEAD
import DeleteUser from './Modal/DeleteUser';
import UserStat from './Modal/UserStat';
=======
import { Button } from 'react-bootstrap'
import DeleteUser from './Modal/DeleteUser';
import {Modal} from "react-bootstrap";
>>>>>>> 35dc76fc667277715a152cf3ca6ec81ad7bae73f

const UserBar = observer(() => {

    var [users, setUsers] = useState([]);
    const [editUserView, setEditUserView] = useState(false)
    const [deleteUserView, setDeleteUserView] = useState(false)
    const [userStatView, setUserStatView] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editUserVisible, setEditUserVisible] = useState(false)
    const [deleteUserVisible, setDeleteUserVisible] = useState(false)

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

<<<<<<< HEAD
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
    
=======
>>>>>>> 35dc76fc667277715a152cf3ca6ec81ad7bae73f
    const columns = [
        { name: 'ID', selector: 'id', sortable: true },
        { name: 'Имя пользователя', selector: 'user_name', sortable: true },
        { name: 'Роль', selector: 'role', sortable: true },
        {
<<<<<<< HEAD
            name: 'Администрирование', cell: row => (
                <div class="d-inlin">
                    <button onClick={() => handleOpenModal(row, 1)} style={{ marginRight: "5px" }} className="btn btn-primary btn-sm bi bi-pencil-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Редактировать"></button>
                    <button onClick={() => handleOpenModal(row, 2)} style={{ marginRight: "5px" }} className="btn btn-primary btn-sm bi bi-eye-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Статистика"></button>
                    <button onClick={() => handleOpenModal(row, 3)} style={{ marginRight: "5px" }} className="btn btn-danger btn-sm bi bi-trash3-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Удалить"></button>
                </div>
            )
=======
            name: 'Админитсрирование', cell: (row) => {return(
                <div className="d-inlin">
                    <Button onClick={() => setEditUserVisible(true)} style={{ marginRight: "5px" }} variant={"primary"} className="btn-sm bi bi-pencil-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Редактировать"></Button>
                    <EditUser userId={row.id} show={editUserVisible} onHide={() => setEditUserVisible(false)} />
                    <Button onClick={() => openDelete(row.id)} style={{ marginRight: "5px" }} variant={"danger"} className="btn-sm bi bi-person-x-fill" data-bs-toggle="tooltip" data-bs-placement="top" title="Удалить"></Button>
                    <DeleteUser userId={row.id} show={deleteUserVisible} onHide={() => setDeleteUserVisible(false)} />
                </div>
            )},
>>>>>>> 35dc76fc667277715a152cf3ca6ec81ad7bae73f
        },
    ]
    
    return (
<<<<<<< HEAD
        <div>
=======
        <>
        
>>>>>>> 35dc76fc667277715a152cf3ca6ec81ad7bae73f
            <DataTable
                columns={columns}
                data={users}
                pagination
                highlightOnHover
                responsive
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            />
<<<<<<< HEAD
            {editUserView && <EditUser data={selectedData} show={editUserView} onHide={() => setEditUserView(false)} />}
            {userStatView && <UserStat data={selectedData} show={userStatView} onHide={() => setUserStatView(false)} />}
            {deleteUserView && <DeleteUser data={selectedData} show={deleteUserView} onHide={() => setDeleteUserView(false)} />}
        </div>
=======
        </>
>>>>>>> 35dc76fc667277715a152cf3ca6ec81ad7bae73f
    )
});

export default UserBar;