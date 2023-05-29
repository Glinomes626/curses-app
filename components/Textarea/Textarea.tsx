import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';
import clNa from "classnames";

export const Textarea = ({ className, ...props }: TextareaProps): JSX.Element => {
    return (
        <textarea className={clNa(className, styles.input)} {...props}/>
    );
}