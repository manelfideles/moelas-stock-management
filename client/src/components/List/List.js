import React from 'react'
import ListItem from '../ListItem';
import styles from './List.module.css';
import { Button, useModal, Text, Spacer, Input } from '@geist-ui/core';
import Modal from '@geist-ui/core/esm/modal';

function DrinkModal({ bindings, add, bevType, setVisible }) {
    return <Modal {...bindings}>
        <form onSubmit={add}>
            <Modal.Title>Add Drink</Modal.Title>
            <Modal.Content className={styles.content}>
                <p>Insert the new beverage's desired name and details and then press 'Ok'</p>
            </Modal.Content>
            <Spacer h={1} />
            <Text>{`New ${bevType.replace('s', '')} name`}</Text>
            <Input
                height={1}
                width='100%'
                placeholder={`e.g. Drink Name`}
            />
            <Spacer h={1} />
            <Text>{`New ${bevType.replace('s', '')} amount`}</Text>
            <Input
                htmlType='number'
                height={1}
                width='100%'
                placeholder={`e.g. 7`}
            />
            <Spacer h={0.5} />
            <div className={styles.btns}>
                <Modal.Action passive onClick={() => setVisible(false)}>Cancel</Modal.Action>
                <Modal.Action htmlType='submit'>Ok</Modal.Action>
            </div>
        </form>
    </Modal>
}

function CocktailModal({ bindings, add, bevType, setVisible }) {
    <Modal {...bindings}>
        <form onSubmit={add}>
            <Modal.Title>Add Cocktail</Modal.Title>
            <Modal.Content className={styles.content}>
                <p>Insert the new beverage's desired name and details and then press 'Ok'</p>
            </Modal.Content>
            <Spacer h={1} />
            <Text>{`New ${bevType.replace('s', '')} name`}</Text>
            <Input
                height={1}
                width='100%'
                placeholder={`e.g. Cocktail Name`}
            />
            <Spacer h={1} />
            <Text>{`New ${bevType.replace('s', '')} amount`}</Text>
            <Input
                htmlType='number'
                height={1}
                width='100%'
                placeholder={`e.g. 7`}
            />
            <Spacer h={0.5} />
            <div className={styles.btns}>
                <Modal.Action passive onClick={() => setVisible(false)}>Cancel</Modal.Action>
                <Modal.Action htmlType='submit'>Ok</Modal.Action>
            </div>
        </form>
    </Modal>
}

export default function List({ bevType, beverages, removeItem, addItem }) {

    const { visible, setVisible, bindings } = useModal()

    const displayBeverages = () => {
        let list = beverages.map((bev, index) =>
            <ListItem
                key={index}
                info={bev}
                removeItem={removeItem}
            />)
        return list;
    }

    const add = (e) => {
        addItem(e.target)
    }

    return (
        <div className={styles.beverages}>
            <p>{bevType.charAt(0).toUpperCase() + bevType.slice(1)}</p>
            <Button type='success' onClick={() => setVisible(true)}>{`Add new ${bevType.replace('s', '')}`}</Button>
            {visible ? bevType === 'drinks' ?
                <DrinkModal
                    bindings={bindings}
                    add={add}
                    bevType={bevType}
                    setVisible={setVisible}
                /> : null : null
            }
            <div className={styles.list}>
                {displayBeverages()}
            </div>
        </div>
    )
}
