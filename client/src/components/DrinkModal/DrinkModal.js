import React from 'react';
import Modal from "@geist-ui/core/esm/modal";
import { Note, Spacer, Text, Input } from "@geist-ui/core";
import styles from './DrinkModal.module.css';


export default function DrinkModal({ bindings, add, bevType, setVisible, setImageBase64 }) {

    return <Modal {...bindings}>
        <form onSubmit={add}>
            <Modal.Title>Add Drink</Modal.Title>
            <Modal.Content>
                <p className={styles.content}>Insert the new beverage's desired name and details and then press 'Ok'</p>
            </Modal.Content>
            <Note label={false} type='error' className={styles.note}>
                * required field
            </Note>
            <Spacer h={1} />
            <Text>
                <span className={styles.required}>* </span>
                {`Drink name`}
            </Text>
            <Input
                height={1}
                width='100%'
                placeholder={`e.g. Drink Name`}
                required={true}
            />
            <Spacer h={1} />
            <Text>
                <span className={styles.required}>* </span>
                {`Drink amount`}
            </Text>
            <Input
                htmlType='number'
                height={1}
                width='100%'
                placeholder={`e.g. 7`}
                required={true}
            />
            <Spacer h={1} />
            <Text>{`Drink image`}</Text>
            <Input
                htmlType='file'
                accept="image/png, image/jpeg"
                height={1}
                width='100%'
                onChange={(e) => {
                    var reader = new FileReader()
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = () => { setImageBase64(reader.result) };
                    reader.onerror = error => console.log("Error: ", error);
                }}
            />
            <Spacer h={0.5} />
            <div className={styles.btns}>
                <Modal.Action passive onClick={() => setVisible(false)}>Cancel</Modal.Action>
                <Modal.Action htmlType='submit'>Ok</Modal.Action>
            </div>
        </form>
    </Modal>
}