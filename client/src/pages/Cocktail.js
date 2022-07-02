import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CocktailCard from '../components/CocktailCard';
import { BASE_URL } from '../utils';

export default function Cocktail() {

    const [details, setDetails] = useState({
        name: '',
        drinks: []
    });

    let params = useParams();

    useEffect(() => {
        axios
            .get(`${BASE_URL}/cocktails/${params.cocktailName}`)
            .then(res => { setDetails(d => ({ ...res.data })) })
    }, [])

    return (
        <>
            <CocktailCard
                name={details.name}
                drinks={details.drinks}
            />
        </>
    )
}