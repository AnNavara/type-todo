import React, { ChangeEvent } from 'react';
import styles from './InputItem.module.css';

interface Props {
    type: string;
    name: string;
    value?: string;
    className?: string;
    min?: string;
    placeholder?: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

const InputItem = ({
    type,
    name,
    placeholder,
    handleChange,
    className,
    value,
    min,
}: Props) => {
    return (
        <input
            value={value}
            min={min}
            className={`${styles.input} ${className}`}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default InputItem;
