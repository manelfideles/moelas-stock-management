import List from '../components/List';
import SearchBar from '../components/SearchBar';
import { Page, useToasts } from '@geist-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/App.module.css';
import { unformatBeverageName, formatBeverageName } from '../utils';

function App() {

  const [drinks, setDrinks] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const { setToast } = useToasts();


  useEffect(() => {
    const first = axios.get('http://localhost:9000/drinks');
    const second = axios.get('http://localhost:9000/cocktails');
    first.then((res) => setDrinks(res.data))
    second.then((res) => setCocktails(res.data))
  }, [])

  const removeDrink = (name) => {
    axios.post('http://localhost:9000/delete', {
      name: name, beverageType: 'drink'
    }).then(res => {
      if (res.status === 200) {
        const newArr = drinks.filter(drink => drink.name !== name);
        setToast({ text: `Successfully deleted ${formatBeverageName(name)}!`, type: 'success' })
        setDrinks(newArr);
      }
      else setToast({ text: `Something went wrong. Try again later.`, type: 'error' })
    })
  }

  const removeCocktail = (name) => {
    axios.post('http://localhost:9000/delete', {
      name: name, beverageType: 'cocktail'
    }).then(res => {
      if (res.status === 200) {
        const newArr = cocktails.filter(ct => ct.name !== name);
        setToast({ text: `Successfully deleted ${formatBeverageName(name)}!`, type: 'success' })
        setCocktails(newArr);
      }
      else setToast({ text: `Something went wrong. Try again later.`, type: 'error' })
    })
  }

  const addDrink = (params) => {
    const name = params[0].value,
      quantity = params[1].value
    // let image;
    // if (params.length > 2) image = params[2].files[0];
    axios.post('http://localhost:9000/update/', {
      "beverageType": 'drink',
      "name": unformatBeverageName(name),
      "quantity": quantity,
      "imageUrl": ''
    }).then(res => {
      if (res.status === 200) setToast({ text: `Successfully added ${formatBeverageName(name)}!`, type: 'success' })
      else setToast({ text: `Something went wrong. Try again later.`, type: 'error' })
    })
  }

  const addCocktail = (params) => {
    console.log('params: ', params);
    axios.post('http://localhost:9000/update/', params)
      .then(res => {
        if (res.status === 200) setToast({ text: `Successfully added ${formatBeverageName(params['name'])}!`, type: 'success' })
        else setToast({ text: `Something went wrong. Try again later.`, type: 'error' })
      })
  }


  return (
    <Page className={styles.home}>
      <SearchBar drinks={drinks} cocktails={cocktails} />
      <div className={styles.content}>
        <List
          bevType='drinks'
          beverages={drinks}
          removeItem={removeDrink}
          addItem={addDrink}
        />
        <List
          bevType='cocktails'
          beverages={cocktails}
          removeItem={removeCocktail}
          addItem={addCocktail}
        />
      </div>
    </Page>
  );
}

export default App;
