import React from "react";
import { Button, Htag } from "../components/main";


export default function Home(): JSX.Element {
    return (
        <>
            <Htag tag='h1' className='fsdfshgfhdf'>Текст</Htag>
            <Button appearance='primary' className='fdsfsdf'>Кнопка</Button>
            <Button appearance='ghost'>Кнопка</Button>
        </>
    );
}
