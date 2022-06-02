import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DrinkCard from '../components/DrinkCard';

export default function Drink() {

    const [details, setDetails] = useState({
        imageUrl: '',
        name: '',
        quantity: ''
    });
    let params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:9000/drinks/${params.drinkName}`)
            .then(res => setDetails(d => ({ ...res.data })))
    }, [])

    const updateDrink = name => {
        console.log('Updating', name);
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
