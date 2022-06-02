import React from 'react'
import {
    Input,
    Spacer, Note, ButtonDropdown
} from '@geist-ui/core';
import Modal from '@geist-ui/core/esm/modal';
import styles from './CustomModal.module.css';

export default function CustomModal({
    bevType, visible, setVisible,
    bindings, textContent
}) {

    return (
        <Modal {...bindings}>
            <Modal.Title>{textContent['title']}</Modal.Title>
            {bevType === 'drinks' ?
                <Modal.Content>
                    <p className={styles.modalcontent}>
                        {`Insert the desired ${bevType.replace('s', '')}'s name and quantity below then click 'Add'.`}
                    </p>
                    <Input width='100%' height={1} placeholder='Drink Name' />
                    <Spacer h={.5} />
                    <Input
                        htmlType='number'
                        height={1}
                        width='100%'
                        placeholder='Drink Quantity'
                    />
                </Modal.Content> :
                <Modal.Content>
                    <p className={styles.modalcontent}>
                        {textContent['body']}
                    </p>
                    <Note type='warning' className={styles.note}>
                        You can only create a new cocktail based on existing drinks.
                    </Note>
                    <Spacer h={1} />
                    <Input width='100%' height={1.25} placeholder='Cocktail Name' />
                    <Spacer h={.5} />
                    <ButtonDropdown width={1.95}>
                        <ButtonDropdown.Item main>Drink</ButtonDropdown.Item>
                        <ButtonDropdown.Item>Secondary Action</ButtonDropdown.Item>
                        <ButtonDropdown.Item>Tertiary Action</ButtonDropdown.Item>
                    </ButtonDropdown>
                </Modal.Content>
            }
            <Modal.Action passive onClick={() => setVisible(false)}>
                <p className={styles.cancel}>Cancel</p>
            </Modal.Action>
            <Modal.Action onClick={() => console.log('Update drink')}>
                <p className={styles.update}>Add</p>
            </Modal.Action>
        </Modal>
    )
}
