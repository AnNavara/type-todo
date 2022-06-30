import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import { CSSTransition } from 'react-transition-group';

type Props = {
    children: any;
    visible: boolean;
    setVisible(arg0: boolean): void;
};

const Modal = ({ children, visible, setVisible }: Props) => {
    const [selfVisible, setSelfVisible] = useState<boolean>(false);
    const [entering, setEntering] = useState<boolean>(false);
    useEffect(() => {
        if (!entering) setSelfVisible(true);
    }, [visible, entering])

    return (
        <CSSTransition
            in={selfVisible}
            timeout={300}
            onEnter={() => setEntering(true)}
            onEntered={() => setEntering(false)}
            onExited={() => setVisible(false)}
            classNames={{
                enterDone: styles['modal-active'],
                enter: styles['modal-enter'],
                enterActive: styles['modal-enter-active'],
                exit: styles['modal-exit'],
                exitActive: styles['modal-exit-active'],
            }}
        >
            <div
                className={styles.modal}
                onClick={() => setSelfVisible(false)}
            >
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
            </div>
        </CSSTransition>
    );
};

export default Modal;
