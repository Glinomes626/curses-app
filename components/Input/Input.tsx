import { InputProps } from './Input.props';
import styles from './Input.module.css';
import clNa from "classnames";
import { ForwardedRef, forwardRef } from "react";

export const Input = forwardRef(({ className, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <div className={clNa(styles.inputWrapper, className )}>
            <input className={clNa(styles.input, {
                [styles.error]: error
            })}
                   ref={ref}
                   {...props}
            />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});