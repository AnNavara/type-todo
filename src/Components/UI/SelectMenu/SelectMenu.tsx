import React, { useState, ChangeEvent } from 'react';
import SelectItem from '../SelectItem/SelectItem';
import styles from './SelectMenu.module.css';
import { CSSTransition } from 'react-transition-group';

interface Props {
    name: string;
    value: any;
    multiple?: boolean;
    defaultValue: string;
    items: string[];
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

const SelectMenu = ({
    name,
    defaultValue,
    value,
    items,
    multiple = false,
    handleChange,
}: Props) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const [menuHeight, setMenuHeight] = useState<number>(0);

    const calcHeight = (el: HTMLElement): void => {
        const height = el ? el.offsetHeight : 0;
        setMenuHeight(height);
    };

    const cssClasses = [styles.toggle];
    let displayValue: string = defaultValue;
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
            <div className={styles.wrapper} style={{ height: menuHeight }}>
                <CSSTransition
                    //  @ts-expect-error
                    in={isOpen}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                    onEnter={calcHeight}
                    onExited={() => setMenuHeight(0)}
                    classNames={{
                        enterActive: styles['dropdown-enter-active'],
                        exitActive: styles['dropdown-exit-active'],
                    }}
                >
                    <div className={styles.dropdown}>
                        {items.map((item: string, index: number) => {
                            let active: boolean = value === item;
                            if (Array.isArray(value))
                                active = value.includes(item);
                            return (
                                <SelectItem
                                    value={item}
                                    active={active}
                                    name={name}
                                    handleChange={handleChange}
                                    key={index}
                                    setIsOpen={setIsOpen}
                                    multiple={multiple}
                                >
                                    {item}
                                </SelectItem>
                            );
                        })}
                    </div>
                </CSSTransition>
            </div>
        </div>
    );
};

export default SelectMenu;
