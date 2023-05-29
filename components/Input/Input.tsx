import { InputProps } from './Input.props';
import styles from './Input.module.css';
import clNa from "classnames";

export const Input = ({ className, ...props }: InputProps): JSX.Element => {
    return (
        <input className={clNa(className, styles.input)} {...props}/>
    );
}