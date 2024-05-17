import React from "react";
import { observer } from "mobx-react-lite";
import { getLevelsForAdmin } from "../http/levelAPI";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditLevel from "./Modal/EditLevel";
import DeleteLevel from "./Modal/DeleteLevel";


const AdminLevelBar = observer(() => {
    const [levels, setLevels] = useState([])
    const [loading, setLoading] = useState(true)
    const [editLevelView, setEditLevelView] = useState(false)
    const [deleteLevelView, setDeleteLevelView] = useState(false)
    const [selectedData, setSelectedData] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            getLevelsForAdmin().then((data) => setLevels(data.data)).finally(() => setLoading(false))
        }, 1000)
    }, []);
    if (loading) {
        return (
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Spinner animation={"grow"} role='status' />
            </div>
        )
    }

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

    const handleOpenModal = (data, modalNumber) => {
        setSelectedData(data)
        if (modalNumber === 1) {
            setDeleteLevelView(true)
        } else if (modalNumber === 2) {
            setDeleteLevelView(true)
        }
    }

    const columns = [
        { name: 'ID', selector: 'id', sortable: true },
        { name: 'Название', selector: 'name', sortable: true },
        { name: 'Ссылка', selector: 'url', sortable: true },
        { name: 'Дата добавления', selector: 'createdAt', sortable: true },
        {
            name: 'Администрирование', cell: row => (
                <Row>
                    <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                        <OverlayTrigger placement="top" overlay={tooltipEdit}>
                            <Button variant="primary" onClick={() => handleOpenModal(row, 1)} style={{ marginRight: "50px" }} size="sm">
                                <MdEdit />
                            </Button>
                        </OverlayTrigger>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                        <OverlayTrigger placement="top" overlay={tooltipDelete}>
                            <Button variant="danger" onClick={() => handleOpenModal(row, 2)} style={{ marginRight: "5px" }} size="sm">
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
                data={levels}
                pagination
                highlightOnHover
                responsive
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            />
            {editLevelView && <EditLevel data={selectedData} show={editLevelView} onHide={() => setEditLevelView(false)} />}
            {deleteLevelView && <DeleteLevel data={selectedData} show={deleteLevelView} onHide={() => setDeleteLevelView(false)} />}
        </div>
    );
});

export default AdminLevelBar;