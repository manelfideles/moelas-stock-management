import React from 'react'
import ListItem from '../ListItem';
import styles from './List.module.css';
import { Button } from '@geist-ui/core';
import axios from 'axios';

export default function List({ bevType, beverages, removeItem }) {

    const displayBeverages = () => {
        console.log(beverages);
        let list = beverages.map((bev, index) =>
            <ListItem
                key={index}
                info={bev}
                removeItem={removeItem}
            />)
        return list;
    }

    return (
        <div className={styles.beverages}>
            <p>{bevType.charAt(0).toUpperCase() + bevType.slice(1)}</p>
            <Button>{`Add new ${bevType}`}</Button>
            <div className={styles.list}>
                {displayBeverages()}
            </div>
        </div>
    )
}
