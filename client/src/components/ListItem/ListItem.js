import React from 'react';
import trash from '../../assets/icons/trash.svg';
import styles from './ListItem.module.css';

import { Link } from 'react-router-dom';
import { formatBeverageName } from '../../utils';


export default function ListItem({ bevType, info, removeItem }) {

    return (
        <div className={styles.item}>
            <span>
                <Link className={styles.link} to={
                    bevType === 'drinks' ?
                        `/drinks/${info.name}` :
                        `/cocktails/${info.name}`
                }>
                    {formatBeverageName(info.name)}
                </Link>
            </span>
            <div className={styles.icons}>
                <button className={styles.actionBtn} onClick={() => removeItem(info.name)}>
                    <img
                        src={trash}
                        height='20px'
                        width='25px'
                        alt="trash-btn"
                    />
                </button>
            </div>
        </div >
    )
}
