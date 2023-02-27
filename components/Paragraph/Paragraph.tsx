import { ParagraphProps } from './Paragraph.props';
import styles from './Paragraph.module.css';
import clNa from "classnames";

export const Paragraph = ({ children, size = 'medium', className, ...props }: ParagraphProps): JSX.Element => {
    return (
        <p className={clNa(styles.paragraph, className, {
            [styles.small]: size === 'small',
            [styles.medium]: size === 'medium',
            [styles.large]: size === 'large'
        })}{...props}
        >
            {children}
        </p>
    );
}