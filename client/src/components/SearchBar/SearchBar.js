import React from 'react'
import AutoComplete from '@geist-ui/core/esm/auto-complete/auto-complete';
import { useState } from 'react';
import { formatBeverageName, unformatBeverageName } from '../../utils';
import { useNavigate } from 'react-router-dom';


export default function SearchBar({ drinks, cocktails }) {
    const drinkUrls = drinks.map(drink => {
        return {
            bevType: 'drinks',
            label: formatBeverageName(drink.name),
            value: formatBeverageName(drink.name),
        }
    })
    const cocktailUrls = cocktails.map(ct => {
        return {
            bevType: 'cocktails',
            label: formatBeverageName(ct.name),
            value: formatBeverageName(ct.name),
        }
    })
    const allOptions = drinkUrls.concat(cocktailUrls)

    const navigate = useNavigate();
    const [options, setOptions] = useState([]);

    const searchHandler = (currentValue) => {
        const value = unformatBeverageName(currentValue);
        if (!value) return setOptions([])
        const relatedOptions = allOptions.filter(item => unformatBeverageName(item.label).includes(value))
        setOptions(relatedOptions)
    }

    const selectHandler = (value) => {
        const foundBev = options.find(elem => elem.value === value)
        if (foundBev) navigate(`/${foundBev.bevType}/${unformatBeverageName(value)}`);
    }

    return <AutoComplete
        options={options}
        width='100%'
        onSelect={selectHandler}
        type='secondary'
        mb={5}
        placeholder="Search anything here..."
        onSearch={searchHandler} />
}
