import React from 'react'
import ListItem from '../ListItem';
import styles from './List.module.css';
import { Button, useModal } from '@geist-ui/core';
import DrinkModal from '../DrinkModal';
import CocktailModal from '../CocktailModal';
import { useState } from 'react';

export default function List({ bevType, beverages, removeItem, addItem }) {

    const { visible, setVisible, bindings } = useModal();
    const [inputFields, setInputFields] = useState([
        { 'drink': '', 'quantity': '' },
    ]);

    const add = (e) => {
        bevType === 'drinks' ? addItem(e.target) : addItem(inputFields)
    }

    const handleFormChange = (index, event) => {
        let data = inputFields;
        data[index][event.target.name] = event.target.value
        setInputFields(data);
    }

    const addInputFields = () => {
        setInputFields([...inputFields, { 'drink': '', 'quantity': '' }])
    }

    const displayBeverages = () => {
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
            {bevType === 'drinks' ?
                <DrinkModal
                    bindings={bindings}
                    add={add}
                    bevType={bevType}
                    setVisible={setVisible}
                /> :
                <CocktailModal
                    bindings={bindings}
                    add={add}
                    bevType={bevType}
                    setVisible={setVisible}
                    inputFields={inputFields}
                    setInputFields={setInputFields}
                    addInputFields={addInputFields}
                    handleFormChange={handleFormChange}
                />
            }
            <div className={styles.list}>
                {displayBeverages()}
            </div>
        </div>
    )
}
