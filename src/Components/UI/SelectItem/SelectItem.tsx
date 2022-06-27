import React, { ChangeEvent } from 'react';
import styles from './SelectItem.module.css';

interface Props {
    name: string;
    value: string;
    multiple?: boolean;
    children: any;
    active: boolean;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
    setIsOpen(isOpen: boolean): void;
}

const SelectItem = ({
    value,
    name,
    active,
    handleChange,
    setIsOpen,
    multiple,
    children,
}: Props) => {
    const clickHandler = (event: any) => {
        handleChange(event);
        if (!multiple) setIsOpen(false);
    };

    const cssClasses = [styles.item];
    if (active) cssClasses.push(styles.active);

    return (
        <button
            value={value}
            name={name}
            onClick={(event) => clickHandler(event)}
            className={cssClasses.join(' ')}
        >
            {children}
        </button>
    );
};

export default SelectItem;
