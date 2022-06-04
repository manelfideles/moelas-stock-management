import React from 'react'
import ListItem from '../ListItem';
import styles from './List.module.css';
import { Button, useModal } from '@geist-ui/core';
import DrinkModal from '../DrinkModal';
import CocktailModal from '../CocktailModal';
import { useState } from 'react';
import { unformatBeverageName } from '../../utils';

export default function List(
    {
        bevType, beverages, removeItem,
        addItem, setImageBase64, imageBase64
    }
) {

    const { visible, setVisible, bindings } = useModal();
    const [inputFields, setInputFields] = useState([
        { 'drink': '', 'quantity': '' },
    ]);

    const add = (e) => {
        if (bevType === 'drinks') { e.preventDefault(); addItem(e.target, imageBase64) }
        else {
            let updatedFields = inputFields.map(drink => {
                return { [unformatBeverageName(drink.drink)]: parseInt(drink.quantity) }
            })
            addItem({
                'beverageType': 'cocktail',
                'name': unformatBeverageName(e.target[0].value),
                'drinks': updatedFields
            })
        }
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
                bevType={bevType}
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
                    imageBase64={imageBase64}
                    setImageBase64={setImageBase64}
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
