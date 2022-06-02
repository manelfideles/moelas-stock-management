import React from 'react'
import ListItem from '../ListItem';
import CustomModal from '../CustomModal/';
import styles from './List.module.css';
import { Button, useModal } from '@geist-ui/core';

export default function List({ bevType, beverages, removeItem }) {

    const { visible, setVisible, bindings } = useModal()

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
            <Button type='success' onClick={() => setVisible(true)}>{`Add new ${bevType.replace('s', '')}`}</Button>
            <CustomModal
                bevType={bevType}
                visible={visible}
                setVisible={setVisible}
                bindings={bindings}
            />
            <div className={styles.list}>
                {displayBeverages()}
            </div>
        </div>
    )
}
