import React from 'react'
import { formatBeverageName } from '../../utils';
import styles from './CocktailCard.module.css';
import { Card, Text, Button } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';

export default function CocktailCard({ name, drinks }) {

    const navigate = useNavigate();

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

    return (
        <div className={styles.cocktailcard}>
            <Card className={styles.card} mb={2} mt={5} pb={1} width="400px">
                <Text h3 mb={0} className={styles.text}>{formatBeverageName(name)}</Text>
                {displayDrinks()}
            </Card>
            <div className={styles.buttons}>
                <Button onClick={() => navigate('..')}>Go back</Button>
                <Button>Update</Button>
            </div>
        </div>
    )
}
