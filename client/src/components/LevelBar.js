import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
import { Row } from "react-bootstrap"
import LevelItem from './LevelItem';

const LevelBar = observer(() => {
    const { level } = useContext(Context)
    return (
        <Row className="d-flex">
            {level.levels.map(level =>
                <LevelItem key={level.id} level={level} />
            )}
        </Row>
    );
});

export default LevelBar;