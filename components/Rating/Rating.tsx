import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import clNa from "classnames";
import StarIcon from './star.svg';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from "react";

export const Rating = forwardRef(({ isEditable = false, rating, setRating, error, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const  [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus =(r: number, i: number): number => {
        if (!isEditable) {
            return -1;
        }

        if (!rating && i === 0) {
            return tabIndex ?? 0;
        }

        if (r === i + 1){
            return tabIndex ?? 0;
        }

        return -1;
    };

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span
                    className={clNa (styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                    tabIndex={computeFocus(rating, i)}
                    onKeyDown={handleKey}
                    ref={r => ratingArrayRef.current?.push(r)}
                    role={isEditable ? 'slider' : ''}
                    aria-label={isEditable ? 'Укажите рейтинг стрелками вверх или вниз' : ('рейтинг' + rating)}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-valuenow={rating}
                    aria-valuemax={5}
                    aria-valuemin={1}
                >
					<StarIcon />
                </span>
            );
        });

        setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
        if(!isEditable) {
            return;
        }

        constructRating(i);
    };

    const onClick = (i: number) => {
        if(!isEditable || !setRating) {
            return;
        }

        setRating(i);
    };

    const handleKey = (e: KeyboardEvent) => {
       if (!isEditable || !setRating) {
           return;
       }

       if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
           if (!rating) {
               e.preventDefault();

               setRating(1);
           } else {
               e.preventDefault();

               setRating(rating < 5 ? rating + 1 : 5);
           }
           ratingArrayRef.current[rating]?.focus();
       }

       if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
           e.preventDefault();

           setRating(rating > 1 ? rating - 1 : 1);

           ratingArrayRef.current[rating - 2]?.focus();
       }
    };

    return (
        <div  className={clNa(styles.ratingWrapper, {
            [styles.error]: error
        })}
              ref={ref}
              {...props}
        >
            {ratingArray.map((r, i) => (<span key={i}>
                {r}
            </span>))}
            {error && <span className={styles.errorMessage} role={'alert'}>
                {error.message}
            </span>}
        </div>
    );
});