import { CardProps } from './Card.props';
import styles from './Card.module.css';
import clNa from "classnames";

export const Card = ({ color = 'white', children, className,...props }: CardProps): JSX.Element => {
    return (
        <div className={clNa(styles.card, className, {
            [styles.blue]: color === 'blue'
        })}
             {...props}
        >
            {children}
        </div>
    );
}