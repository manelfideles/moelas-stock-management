import React from 'react'
import ListItem from '../ListItem';
import styles from './List.module.css';
import { Button } from '@geist-ui/core';


export default function List({ bevType, beverages }) {

    const displayBeverages = (bevs, index) => {
        let list = bevs.map(bev => <ListItem key={index} info={bev} />)
        return list;
    }

    return (
        <div className={styles.beverages}>
            <p>{bevType.charAt(0).toUpperCase() + bevType.slice(1)}</p>
            <Button>{`Add new ${bevType}`}</Button>
            <div className={styles.list}>
                {displayBeverages(beverages)}
            </div>
        </div>
    )
}
