import React, { ChangeEvent } from 'react';
import styles from './ToggleItem.module.css';

interface Props {
    name: string;
    value: string;
    children: any;
    active: boolean;
    index: number;
    indexLast: number;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

const ToggleItem = ({
    value,
    name,
    active,
    index,
    indexLast,
    handleChange,
    children,
}: Props) => {
    const cssClasses = [styles.toggleItem]
    if (active) cssClasses.push(styles.active)
    if (index === 0) cssClasses.push(styles.first)
    if (index === indexLast) cssClasses.push(styles.last)

    return (
        <button 
            className={cssClasses.join(' ')}
            name={name}
            value={value}
            onClick={(event: any) => handleChange(event)}>
            {children}
        </button>
    );
};

export default ToggleItem;
