import React, { ChangeEvent, useState } from 'react'
import Button from '../UI/Button/Button';
import InputItem from '../UI/Input/InputItem';
import styles from './TypesManager.module.css';

interface Props {
    taskTypes: string[];
    setTypesManager(status: boolean): void;
    addType(type: string): void;
    removeType(type: string): void;
}

const TypesManager = ({ taskTypes, setTypesManager, addType, removeType }: Props) => {
    const [ newType, setNewType ] = useState<string>('');
    const setTypes = () => {
        addType(newType);
    }
    const handleTypes = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === 'type') setNewType(event.target.value);
    };

    return (
        <div className={styles.typesManager}>
            <div className={styles.typeMagerContainer}>
                <h2 className={styles.typesManagerTitle}>Управление типам заданий</h2>
                <Button mod='transparent' click={() => setTypesManager(false)}>Назад</Button>
            </div>
            {taskTypes.map((type: string, index: number) => {
                return (
                    <div className={styles.typesManagerItem} key={type + index}>
                        <p>{type}</p>
                        <Button mod='transparent' click={() => removeType(type)}>Удалить</Button>
                    </div>
                )
            })}
            <InputItem placeholder="Новый тип" type="type" name="type" handleChange={handleTypes} />
            <Button click={() => setTypes()}>
                Добавить тип
            </Button>
        </div>
    )
}

export default TypesManager