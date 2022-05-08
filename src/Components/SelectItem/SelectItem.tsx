import React from 'react';
import styles from './SelectItem.module.css';

const SelectItem = (props: any) => {

    const clickHandler = (event: any) => {
        props.handleChange(event);
    };
    
    const cssClasses = [styles.item];
    if (props.active) cssClasses.push(styles.active);

    return (
        <button
            value={props.value}
            name={props.name}
            onClick={(event) => clickHandler(event)}
            className={cssClasses.join(' ')}
        >
            {props.children}
        </button>
    );
};

export default SelectItem;
