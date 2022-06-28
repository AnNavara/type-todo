import React, { ChangeEvent } from 'react'
import ToggleItem from './ToggleItem/ToggleItem';
import styles from './Toggle.module.css';

interface Props {
    name: string;
    value: string | any[];
    defaultValue: string;
    items: any;
    click(event: ChangeEvent<HTMLInputElement>): void;
}

const Toggle = ({
    name,
    value,
    defaultValue,
    items,
    click
}: Props) => {

    return (
        <div className={styles.toggle}>
            <h3 className={styles.toggleTitle}>{defaultValue}</h3>
            <div className={styles.toggleContainer}>
                {items.map((item: string, index: number) => {
                    let active: boolean = false;
                    if (Array.isArray(value)) {
                        active = value.includes(item);
                    } else {
                        active = value === item;
                    }
                    return (
                        <ToggleItem
                            key={item + index}
                            click={click} 
                            name={name}
                            value={item} 
                            active={active}
                            index={index}
                            indexLast={items.length - 1}
                        >
                            {item}
                        </ToggleItem>
                    )
                })}
            </div>
        </div>
    )
}

export default Toggle