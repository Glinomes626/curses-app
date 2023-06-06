import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { declOfNum, priceRu } from "../../helpers/helpers";
import { Divider } from "../Divider/Divider";
import Image from "next/image";
import clNa from "classnames";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import Link from "next/link";
import { motion } from "framer-motion";

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
        visible: { opacity: 1, height: 'auto' },
        hidden: { opacity: 0, height: 0 }
    };

    const scrollToReview = () => {
        setReviewOpened(true);

        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        reviewRef.current?.focus();
    };

    return (
        <div
            className={className}
            {...props} ref={ref}
        >
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>
                <div className={styles.title}>
                    {product.title}
                </div>
                <div className={styles.price}>
                    <span>
                        <span className={"visualy-hidden"}>Цена</span>
                        {priceRu(product.price)}
                    </span>
                    {product.oldPrice && <Tag
                        className={styles.oldPrice}
                        color='green'
                    >
                        <span className={"visualy-hidden"}>Скидка</span>
                        {priceRu(product.price - product.oldPrice)}
                    </Tag>}
                </div>
                <div className={styles.credit}>
                    <span className={"visualy-hidden"}>Кредит</span>
                    {priceRu(product.credit)}/<span className={styles.month}>мес</span>
                </div>
                <div className={styles.rating}>
                    <span className={"visualy-hidden"}>
                        {'Рейтинг' + (product.reviewAvg ?? product.initialRating)}
                    </span>
                    <Rating rating={product.reviewAvg ?? product.initialRating}/>
                </div>
                <div className={styles.tag}>
                    {product.categories.map(c => <Tag
                        className={styles.category}
                        key={c}
                        color='ghost'
                    >
                        {c}
                    </Tag>)}
                </div>
                <div className={styles.priceTitle} aria-hidden={true}>цена</div>
                <div className={styles.creditTitle} aria-hidden={true}>Кредит
                </div>
                <div className={styles.rateTitle}>
                    <Link
                        href={'#ref'}
                        onClick={scrollToReview}
                    >
                        {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
                    </Link>
                </div>
                <Divider className={styles.hr}/>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map(c => (
                        <div
                            className={styles.characteristics}
                            key={c.name}
                        >
                            <span className={styles.characteristicsName}>{c.name}</span>
                            <span className={styles.characteristicsDots}></span>
                            <span className={styles.characteristicsValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages && <div
                        className={styles.advantages}
                    >
                        <div className={styles.advTitle}>Преимущества</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages && <div
                        className={styles.disadvantages}
                    >
                        <div className={styles.advTitle}>Недостатки</div>
                        <div>{product.disadvantages}</div>
                    </div>}
                </div>
                <Divider className={clNa(styles.hr, styles.hr2)}/>
                <div className={styles.actions}>
                    <Button appearance='primary'>Узнать подробнее</Button>
                    <Button
                        appearance='ghost'
                        arrow={isReviewOpened ? 'down' : 'right'}
                        onClick={() => setReviewOpened(!isReviewOpened)}
                        aria-expanded={isReviewOpened}
                    >
                        Читать отзывы
                    </Button>
                </div>
            </Card>
            <motion.div
                animate={isReviewOpened ? 'visible' : 'hidden'}
                variants={variants}
                initial='hidden'
            >
                <Card
                    className={clNa(styles.reviews, {
                        [styles.opened]: isReviewOpened,
                        [styles.closed]: !isReviewOpened
                    })}
                    color='blue'
                    ref={reviewRef}
                    tabIndex={isReviewOpened ? 0 : -1}
                >
                    {product.reviews.map(r => (
                        <div key={r._id}>
                            <Review review={r}/>
                            <Divider />
                        </div>
                    ))}
                    <ReviewForm productId={product._id} isOpened={isReviewOpened} />
                </Card>
            </motion.div>
        </div>
    );
}));