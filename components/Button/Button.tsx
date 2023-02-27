import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import ArrowIcon from  './arrow.svg';
import clNa from "classnames";

export const Button = ({ appearance, children, arrow = 'none', className, ...props }: ButtonProps): JSX.Element => {
    return (
        <button className={clNa(styles.button, className, {
            [styles.primary]: appearance === 'primary',
            [styles.ghost]: appearance === 'ghost'
        })}{...props}
        >
            {children}
            {arrow !== 'none' && <span className={clNa(styles.arrow, {
                [styles.down]: arrow === 'down'
            })}>
                <ArrowIcon />
            </span>}
        </button>
    );
};