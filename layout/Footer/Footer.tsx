import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import clNa from "classnames";
import { format } from "date-fns";

export const Footer = ({ className,...props }: FooterProps): JSX.Element => {
    return (
        <footer className={clNa(className, styles.footer)} {...props}>
            <div>
                OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
            </div>
            <a href="#" target="_blank">Пользовательское соглашение</a>
            <a href="#" target="_blank">Политика конфиденциальности</a>
        </footer>
    );
};