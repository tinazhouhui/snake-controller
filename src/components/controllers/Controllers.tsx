import React, {useEffect, useState} from 'react';
import {motionHandler} from '../../services/apiClientAppSync';
import {DOWN, LEFT, playerId, RIGHT, screenId, UP} from '../../consts';
import styles from './Controllers.module.css';
import VerticalControllers from './VerticalControllers/VerticalControllers';
import HorizontalControllers from './HorizontalControllers/HorizontalControllers';

interface IProps {
    name: string,
    color: string
}

function Controllers({name, color}: IProps) {
    const [isPortrait, setPortrait] = useState<boolean>(checkPortrait());

    function checkPortrait(): boolean {
        return window.matchMedia('(orientation: portrait)').matches;
    }

    window.onresize = function () {
        setPortrait(checkPortrait());
    };

    function handleClick(direction: string) {
        // send updated position to appsync
        motionHandler(screenId, playerId, color, name, direction);
    }

    return (
        <div className={styles.container}>
            {(name !== '') && (isPortrait ? <h2 className={styles.name}>{name}</h2> : <h2 className={`${styles.name} ${styles.lower}`}>{name}</h2>)}
            {isPortrait ?
                <VerticalControllers handleClick={handleClick}/> :
                <HorizontalControllers handleClick={handleClick}/>}
        </div>
    );
}

export default Controllers;