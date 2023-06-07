import '../styles/globals.css';
import {AppProps} from "next/app";
import Head from "next/head";
import React from "react";
import { YMInitializer } from 'react-yandex-metrika';
import ym from 'react-yandex-metrika';
import { Noto_Sans } from 'next/font/google';
import { Router } from "next/router";

const notSans = Noto_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700']
});

Router.events.on('routeChangeComplete', (url: string) => {
    if (typeof window !== 'undefined') {
        ym('hit', url);
    }
});

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {

    return <>
        <Head>
            <title>Агрегатор лучших курсов онлайн - КурсесТоп</title>
            <link rel="preconnect" href="https://mc.yandex.ru" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
            <meta property='og:locale' content="ru_RU" />
            <style>
                {`
                    html {
                        font-family: ${notSans.style.fontFamily};
                    }        
                `}
            </style>
        </Head>
        <YMInitializer
            accounts={[]}
            options={{ webvisor: true, defer: true }}
            version="2"
        />
        <Component {...pageProps} />
    </>;
}