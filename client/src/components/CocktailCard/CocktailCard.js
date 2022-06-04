import React from 'react'
import { unformatBeverageName, formatBeverageName } from '../../utils';
import styles from './CocktailCard.module.css';
import { Card, Text, Button, Input } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';
import { useModal, Spacer, Note } from '@geist-ui/core';
import Modal from '@geist-ui/core/esm/modal';
import axios from 'axios';

export default function CocktailCard({ name, drinks }) {

    const navigate = useNavigate();
    const { visible, setVisible, bindings } = useModal();

    const displayDrinks = () => {
        let drinkList = drinks
            .map(drink => {
                return <Text
                    mb={0}
                    className={styles.text}>
                    {`${drink.quantity}x ${formatBeverageName(drink.name)}`}
                </Text>
            })
        return drinkList;
    }

    const handleUpdate = (e) => {
        let updatedDrinks = drinks.map((drink, index) => {
            return { [drink.name]: parseInt(e.target[index].value) }
        })
        console.log(updatedDrinks);
        axios.post('http://localhost:9000/update', {
            "beverageType": 'cocktail',
            "name": unformatBeverageName(name),
            "drinks": updatedDrinks,
        })
    }

    return (
        <div className={styles.cocktailcard}>
            <Card className={styles.card} mb={2} mt={5} pb={1} width="400px">
                <Text h3 mb={0} className={styles.text}>{formatBeverageName(name)}</Text>
                {displayDrinks()}
            </Card>
            <div className={styles.buttons}>
                <Button type='error' onClick={() => navigate('..')}>Go back</Button>
                <Button type='success' onClick={() => setVisible(true)}>Update</Button>
            </div>
            <Modal {...bindings}>
                <form onSubmit={handleUpdate}>
                    <Modal.Title>Update Cocktail</Modal.Title>
                    <Modal.Content className={styles.content}>
                        <p>Select the new desired amounts and then press 'Ok'</p>
                    </Modal.Content>
                    <Spacer h={1} />
                    <Note
                        label={false}
                        type='error'
                        className={styles.note}
                    >
                        * required fields
                    </Note>
                    {drinks.map(drink => {
                        return <>
                            <Text>
                                <span className={styles.required}>* </span>
                                {`New ${formatBeverageName(drink['name'])} Quantity`}
                            </Text>
                            <Input
                                htmlType='number'
                                height={1}
                                width='100%'
                                placeholder={`e.g ${drink['quantity']}`}
                                required
                            />
                            <Spacer h={0.5} />
                        </>
                    })}
                    <div className={styles.btns}>
                        <Modal.Action passive onClick={() => setVisible(false)}>Cancel</Modal.Action>
                        <Modal.Action htmlType='submit'>Update</Modal.Action>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
