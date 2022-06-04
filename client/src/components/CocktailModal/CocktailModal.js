import React from 'react';
import Modal from '@geist-ui/core/esm/modal';
import { Input, Text, Spacer, Button, Note } from '@geist-ui/core';
import styles from './CocktailModal.module.css';


export default function CocktailModal({
    bindings, add, bevType,
    setVisible, inputFields,
    setInputFields, addInputFields,
    handleFormChange
}) {

    const displayInputFields = () => {
        let fields = inputFields.map((input, index) => {
            return <div key={index}>
                <Text>{index === 0 ? <span className={styles.required}>* </span> : null}{`Drink #${index + 1}`}</Text>
                <Input
                    name='drink'
                    height={1}
                    width='100%'
                    placeholder={`e.g. Drink Name`}
                    onChange={e => handleFormChange(index, e)}
                    required={index === 0}
                />
                <Spacer h={0.5} />
                <Input
                    name='quantity'
                    htmlType='number'
                    height={1}
                    width='100%'
                    placeholder={`Drink Quantity e.g. 7`}
                    onChange={e => handleFormChange(index, e)}
                    required={index === 0}
                />
                <Spacer h={1} />
            </div>
        })
        return fields;
    }

    return <Modal {...bindings}>
        <form onSubmit={add}>
            <Modal.Title>Add Cocktail</Modal.Title>
            <Modal.Content>
                <p className={styles.content}>Insert the new beverage's desired name and details and then press 'Ok'</p>
            </Modal.Content>
            <Note
                label={false}
                type='error'
                className={styles.note}
            >
                * required fields
            </Note>
            <Text>
                <span className={styles.required}>* </span>
                {`New ${bevType.replace('s', '')} name`}
            </Text>
            <Input
                height={1}
                width='100%'
                placeholder={`e.g. Cocktail Name`}
            />
            <Spacer h={1} />
            {displayInputFields()}
            <Button width='100%' type='secondary' onClick={addInputFields}>Add drink to list</Button>
            <div className={styles.btns}>
                <Modal.Action passive onClick={() => { setVisible(false); setInputFields([{ 'drink': '', 'quantity': '' }]) }}>Cancel</Modal.Action>
                <Modal.Action htmlType='submit'>Ok</Modal.Action>
            </div>
        </form>
    </Modal>
}