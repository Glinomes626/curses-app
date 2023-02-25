import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import clNa from "classnames";

export const Button = ({ appearance, children, className, ...props }: ButtonProps): JSX.Element => {
    return (
        <button className={clNa(styles.button, className, {
            [styles.primary]: appearance === 'primary',
            [styles.ghost]: appearance === 'ghost'
        })}{...props}
        >
            {children}
        </button>
    );
};