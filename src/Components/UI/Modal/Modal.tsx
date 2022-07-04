import styles from './Modal.module.css';
import { CSSTransition } from 'react-transition-group';

type Props = {
    children: any;
    visible: boolean;
    timing: number;
    setVisible(arg0: boolean): void;
};

const Modal = ({ children, visible, timing, setVisible }: Props) => {
    return (
        <CSSTransition
            in={visible}
            timeout={timing}
            mountOnEnter
            unmountOnExit
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
                onClick={() => setVisible(false)}
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
