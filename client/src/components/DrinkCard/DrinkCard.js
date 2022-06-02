import React from 'react'
import { formatBeverageName } from '../../utils';
import styles from './DrinkCard.module.css';
import bottle from '../../assets/icons/bottle.svg';
import { Card, Image, Text, Button } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';

export default function DrinkCard({ name, quantity, imageUrl }) {

    const navigate = useNavigate();

    return (
        <div className={styles.drinkcard}>
            <Card className={styles.card} mb={2} mt={5} width="400px">
                <Image mt={2} src={imageUrl !== '' ? imageUrl : bottle}
                    height="200px" width="200px" draggable={false} />
                <Text h3 mb={0} className={styles.text}>{formatBeverageName(name)}</Text>
                <Text className={styles.text}>Quantity: {quantity}</Text>
            </Card>
            <div className={styles.buttons}>
                <Button onClick={() => navigate('..')}>Go back</Button>
                <Button>Update</Button>
            </div>
        </div>
    )
}
