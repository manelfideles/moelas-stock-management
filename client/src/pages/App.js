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
  const [imageBase64, setImageBase64] = useState('');


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

  const addDrink = (params, image) => {
    const name = params[0].value,
      quantity = params[1].value

    const data = {
      "beverageType": 'drink',
      "name": unformatBeverageName(name),
      "quantity": parseInt(quantity),
      "imageUrl": image
    }

    console.log('DATA: ', data);

    axios.post('http://localhost:9000/update', data)
      .then(res => {
        console.log('Done!');
        if (res.status === 200) setToast({ text: `Successfully added ${formatBeverageName(name)}!`, type: 'success' })
        else setToast({ text: `Something went wrong. Try again later.`, type: 'error' })
      })
  }

  const addCocktail = (params) => {
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
          imageBase64={imageBase64}
          setImageBase64={setImageBase64}
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
