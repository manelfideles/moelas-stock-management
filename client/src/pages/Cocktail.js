import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CocktailCard from '../components/CocktailCard';

export default function Cocktail() {

    const [details, setDetails] = useState({
        name: '',
        drinks: []
    });

    let params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:9000/cocktails/${params.cocktailName}`)
            .then(res => { setDetails(d => ({ ...res.data })) })
    }, [])

    const updateCocktail = name => {
        console.log('Updating', name);
    }

    return (
        <>
            <CocktailCard
                name={details.name}
                drinks={details.drinks}
                updateCocktail={updateCocktail}
            />
        </>
    )
}