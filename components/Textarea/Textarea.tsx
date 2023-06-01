import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';
import clNa from "classnames";
import { ForwardedRef, forwardRef } from "react";

export const Textarea = forwardRef(({ error, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={clNa(styles.textAreaWrapper, className )}>
            <textarea className={clNa(styles.textArea, {
                [styles.error]: error
            })}
                      ref={ref}
                      {...props}
            />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});