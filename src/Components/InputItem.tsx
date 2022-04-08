import React, { ChangeEvent } from 'react';

interface Props {
    type: string;
    value: any;
    name: string;
    placeholder?: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

const InputItem = ({ type, value, name, placeholder, handleChange }: Props) => {
    return (
        <input
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default InputItem;