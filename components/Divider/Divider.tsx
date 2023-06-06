import { DividerProps } from './Divider.props';
import styles from './Divider.module.css';
import clNa from "classnames";

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
    return (
        <hr className={clNa(className, styles.hr)} {...props}/>
    );
};