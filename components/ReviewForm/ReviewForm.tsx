import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import  CloseIcon  from "./close.svg";
import clNa from "classnames";
import { Rating } from "../Rating/Rating";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import { Controller , useForm } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";
import { useState } from "react";

export const ReviewForm = ({ isOpened, productId, className,...props }: ReviewFormProps): JSX.Element => {
    const { register, handleSubmit, control, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>({
        defaultValues: {
            name: '',
            title: '',
            description: '',
        }
    });

    const [ isSuccess, setIsSuccess ] = useState<boolean>(false);
    const [ isError, setIsError ] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId});
            if (data.message) {
                setIsSuccess(true);

                reset();
            } else {
                setIsError('Что-то пошло не так');
            }
        } catch (error) {
            if (error instanceof Error) {
                setIsError(error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
                className={clNa(styles.reviewForm, className)}
                {...props}
            >
                <Input
                    className={styles.input}
                    placeholder="Имя"
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })}
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.name}
                />
                <Input
                    className={styles.input}
                    placeholder="Заголовок отзыва"
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name='rating'
                        rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
                        render={( { field: { onChange , value, ref } } )=> (
                            <Rating
                                isEditable
                                rating={value}
                                setRating={onChange}
                                ref={ref}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        )}
                    />
                </div>
                <Textarea
                    className={styles.description}
                    placeholder='Текст отзыва'
                    {...register('description', { required: { value: true, message: 'Заполните отзыв' } })}
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                    aria-label={'Текст отзыва'}
                    aria-invalid={!!errors.description}
                />
                <div className={styles.submit}>
                    <Button
                        appearance='primary'
                        tabIndex={isOpened ? 0 : -1}
                        onClick={() => clearErrors()}
                    >
                        Отправить
                    </Button>
                    <span className={styles.info} >* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div
                className={clNa(styles.success, styles.panel)}
                role={'alert'}
            >
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо, ваш отзыв будет опубликован после проверки.
                </div>
                <button
                    className={styles.close}
                    onClick={()=> setIsSuccess(false)}
                    aria-label={"Закрыть оповещение"}
                >
                    <CloseIcon />
                </button>

            </div>}
            {isError && <div
                className={clNa(styles.isError, styles.panel)}
                role={'alert'}
            >
                Что-то пошло не так, попробуйте обновить страницу.
                <button
                    className={styles.close}
                    onClick={() => setIsError(undefined)}
                    aria-label={"Закрыть оповещение"}
                >
                    <CloseIcon />
                </button>
            </div>}
        </form>
    );
};