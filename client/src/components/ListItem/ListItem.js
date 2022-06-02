import React from 'react';
import edit from '../../assets/icons/edit.svg';
import trash from '../../assets/icons/trash.svg';
import styles from './ListItem.module.css';

import { Link } from 'react-router-dom';
import { formatBeverageName } from '../../utils';

export default function ListItem({ info }) {

    return (
        <div className={styles.item}>
            <span>
                <Link className={styles.link} to={
                    info.imageUrl !== undefined ?
                        `/drinks/${info.name}` :
                        `/cocktails/${info.name}`
                }>
                    {formatBeverageName(info.name)}
                </Link>
            </span>
            <div className={styles.icons}>
                <button className={styles.actionBtn} id={styles.editBtn}>
                    <img
                        src={edit}
                        height='25px'
                        width='25px'
                        alt="edit-btn"
                    />
                </button>
                <button className={styles.actionBtn} id={styles.trashBtn}>
                    <img
                        src={trash}
                        height='22px'
                        width='25px'
                        alt="trash-btn"
                    />
                </button>
            </div>
        </div>
    )
}
