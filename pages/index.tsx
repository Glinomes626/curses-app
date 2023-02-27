import React from "react";
import {Button, Htag, Paragraph, Tag} from "../components/main";


export default function Home(): JSX.Element {
    return (
        <>
            <Htag tag='h1' className='fsdfshgfhdf'>Текст</Htag>
            <Button appearance='primary' className='fdsfsdf' arrow='right'>Кнопка</Button>
            <Button appearance='ghost' arrow={"down"}>Кнопка</Button>
            <Paragraph size={'small'}>Маленький</Paragraph>
            <Paragraph>Стандартный</Paragraph>
            <Paragraph size={'large'}>большой</Paragraph>
            <Tag size={'small'}>Ghost</Tag>
            <Tag size={'medium'} color={"red"}>red</Tag>
            <Tag size={'small'} color={"green"}>green</Tag>
            <Tag color={"primary"}>green</Tag>
        </>
    );
}
