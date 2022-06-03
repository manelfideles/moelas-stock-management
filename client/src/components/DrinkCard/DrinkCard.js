import React from 'react'
import { formatBeverageName } from '../../utils';
import styles from './DrinkCard.module.css';
import bottle from '../../assets/icons/bottle.svg';
import {
    Card, Image, Text,
    Button, useModal, Spacer,
    Input
} from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';
import Modal from '@geist-ui/core/esm/modal';

export default function DrinkCard({ name, quantity, imageUrl, updateDrink }) {

    const navigate = useNavigate();
    const { visible, setVisible, bindings } = useModal();

    const handleUpdate = (e) => {
        updateDrink(name, e.target[0].value);
    }

    return (
        <div className={styles.drinkcard}>
            <Card className={styles.card} mb={2} mt={5} width="400px">
                <Image mt={2} src={imageUrl !== '' ? imageUrl : bottle}
                    height="200px" width="200px" draggable={false} />
                <Text h3 mb={0} className={styles.text}>{formatBeverageName(name)}</Text>
                <Text className={styles.text}>Quantity: {quantity}</Text>
            </Card>
            <div className={styles.buttons}>
                <Button type='error' onClick={() => navigate('..')}>Go back</Button>
                <Button type='success' onClick={() => setVisible(true)}>Update</Button>
            </div>
            <Modal {...bindings}>
                <form onSubmit={handleUpdate}>
                    <Modal.Title>Update Drink</Modal.Title>
                    <Modal.Content className={styles.content}>
                        <p>Select the new desired amounts and then press 'Ok'</p>
                    </Modal.Content>
                    <Spacer h={1} />
                    <Text>{`New ${formatBeverageName(name)} Quantity`}</Text>
                    <Input
                        htmlType='number'
                        height={1}
                        width='100%'
                        placeholder={`e.g. 7`}
                    />
                    <Spacer h={0.5} />
                    <div className={styles.btns}>
                        <Modal.Action passive onClick={() => setVisible(false)}>Cancel</Modal.Action>
                        <Modal.Action htmlType='submit'>Update</Modal.Action>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
