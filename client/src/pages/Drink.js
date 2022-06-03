import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DrinkCard from '../components/DrinkCard';
import { useToasts } from '@geist-ui/core';
import { formatBeverageName } from '../utils';

export default function Drink() {

    const [details, setDetails] = useState({
        imageUrl: '',
        name: '',
        quantity: ''
    });
    let params = useParams();
    const { setToast } = useToasts();

    useEffect(() => {
        axios
            .get(`http://localhost:9000/drinks/${params.drinkName}`)
            .then(res => setDetails(d => ({ ...res.data })))
    }, [])

    const updateDrink = (name, quantity) => {
        console.log('Updating', name, '...');
        const updatedData = {
            "beverageType": "drink",
            "name": name,
            "quantity": parseInt(quantity),
            "imageUrl": ""
        }
        axios.post('http://localhost:9000/update', updatedData)
            .then(res => {
                if (res.status === 200)
                    setToast({ text: `Successfully updated ${formatBeverageName(name)}'s stock amount!`, type: 'success' })
                else
                    setToast({ text: `Something went wrong. Try again later.`, type: 'error' })
            })
    }

    return (
        <>
            <DrinkCard
                name={details.name}
                quantity={details.quantity}
                imageUrl={details.imageUrl}
                updateDrink={updateDrink}
            />
        </>
    )
}
