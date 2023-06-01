import { CardProps } from './Card.props';
import styles from './Card.module.css';
import clNa from "classnames";
import { ForwardedRef, forwardRef } from "react";

export const Card = forwardRef(({ color = 'white', children, className,...props }: CardProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
        <div className={clNa(styles.card, className, {
            [styles.blue]: color === 'blue'
        })}
             ref={ref}
             {...props}
        >
            {children}
        </div>
    );
});