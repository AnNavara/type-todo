import React from 'react';
import styles from './Modal.module.css';

type Props = {
    children: any;
    visible: boolean;
    setVisible(arg0: boolean): void;
};

const Modal = ({ children, visible, setVisible }: Props) => {

    const rootClasses = [styles.modal];
    if (visible) rootClasses.push(styles.active);

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
