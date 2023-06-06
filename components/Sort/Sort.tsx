import {SortEnum, SortProps} from "./Sort.props";
import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";
import clNa from "classnames";

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
    return (
        <div className={clNa(styles.sort, className)} {...props}>
            <div className={styles.sortName} id={"sortRating"}>Сотрировка по рейтингу</div>
            <div className={styles.sortName} id={"sortPrice"}>Сотрировка по цене</div>
            <button
                onClick={() => setSort(SortEnum.Rating)}
                className={clNa({
                    [styles.active]: sort === SortEnum.Rating
                })}
                aria-selected={sort === SortEnum.Rating}
                aria-labelledby={"sortRating"}
            >
                <SortIcon className={styles.sortIcon} />По рейтингу
            </button>
            <button
                onClick={() => setSort(SortEnum.Price)}
                className={clNa({
                    [styles.active]: sort === SortEnum.Price
                })}
                aria-selected={sort === SortEnum.Price}
                aria-labelledby={"sortPrice"}
            >
                <SortIcon className={styles.sortIcon} />По цене
            </button>
        </div>
    );
};