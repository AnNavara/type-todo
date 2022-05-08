import React, { useState, ChangeEvent } from 'react';
import SelectItem from '../SelectItem/SelectItem';
import styles from './SelectMenu.module.css';

interface Props {
    name: string;
    value: any;
    defaultValue: string;
    items: any;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

const SelectMenu = ({ name, defaultValue, value, items, handleChange }: Props) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const cssClasses = [styles.toggle];
    let displayValue:string = defaultValue;
    if (!Array.isArray(value)) {
        if (value !== '') cssClasses.push(styles.selected);
        displayValue = value || defaultValue;
    } else {
        if (value.length > 0) cssClasses.push(styles.selected);
        displayValue = value.length ? value.join(' ') : defaultValue;
    }

    return (
        <div className={styles.menu}>
            <button
                className={cssClasses.join(' ')}
                onClick={() => setIsOpen(!isOpen)}
            >
                {displayValue}
            </button>
            {isOpen && (
                <div className={styles.dropdown}>
                    {items.map((item: string, index: number) => {
                        let active:boolean = value === item;
                        if (Array.isArray(value)) active = value.includes(item);
                        return (
                            <SelectItem
                                value={item}
                                active={active}
                                name={name}
                                handleChange={handleChange}
                                key={index}
                            >
                                {/* {props.icon} */}
                                {item}
                            </SelectItem>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SelectMenu;
