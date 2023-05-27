import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Htag, Paragraph, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';


function Home({ menu }: HomeProps): JSX.Element {

    return (
        <>
            <Htag tag='h1'>Заголовок</Htag>
            <Button appearance='primary' arrow='right'>Кнопка</Button>
            <Button appearance='ghost' arrow={"down"}>Кнопка</Button>
            <Paragraph size={'small'}>Маленький</Paragraph>
            <Paragraph>Стандартный</Paragraph>
            <Paragraph size={'large'}>большой</Paragraph>
            <Tag size={'small'}>Ghost</Tag>
            <Tag size={'medium'} color={"red"}>red</Tag>
            <Tag size={'small'} color={"green"}>green</Tag>
            <Tag color={"primary"}>green</Tag>
            <Rating rating={4} isEditable />
            <ul>
                {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
            </ul>
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    return {
        props: {
            menu,
            firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
