import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { FunctionComponent, useState, KeyboardEvent, useRef } from "react";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components";
import clNa from "classnames";

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const skipContentAction = (key: KeyboardEvent) => {
        if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault();

            bodyRef.current?.focus();
        }

        setIsSkipLinkDisplayed(false);
    };

    return (
        <div className={styles.wrapper}>
            <span
                className={clNa(styles.skipLink, {
                    [styles.displayed]: isSkipLinkDisplayed
                })}
                tabIndex={0}
                onFocus={() => setIsSkipLinkDisplayed(true)}
                onKeyDown={skipContentAction}
            >Сразу к содержанию</span>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} />
            <main
                className={styles.body}
                ref={bodyRef}
                tabIndex={0}
                role={"main"}
            >
                {children}
            </main>
            <Footer className={styles.footer} />
            <Up />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };
};