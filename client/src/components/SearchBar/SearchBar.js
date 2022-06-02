import React from 'react'
import AutoComplete from '@geist-ui/core/esm/auto-complete/auto-complete';
import { useState } from 'react';


export default function SearchBar({ drinks, cocktails }) {
    const allOptions = [
        { label: 'London', value: 'london' },
        { label: 'Sydney', value: 'sydney' },
        { label: 'Shanghai', value: 'shanghai' },
    ]
    const [options, setOptions] = useState()
    const searchHandler = (currentValue) => {
        if (!currentValue) return setOptions([])
        const relatedOptions = allOptions.filter(item => item.value.includes(currentValue))
        setOptions(relatedOptions)
    }
    return <AutoComplete
        options={options}
        width='100%'
        mb={5}
        placeholder="Search anything here..."
        onSearch={searchHandler} />
}
