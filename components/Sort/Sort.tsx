import {SortEnum, SortProps} from "./Sort.props";
import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";
import clNa from "classnames";

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
    return (
        <div className={clNa(styles.sort, className)} {...props}>
            <span
                onClick={() => setSort(SortEnum.Rating)}
                className={clNa({
                    [styles.active]: sort === SortEnum.Rating
                })}
            >
                <SortIcon className={styles.sortIcon} />По рейтингу
            </span>
            <span
                onClick={() => setSort(SortEnum.Price)}
                className={clNa({
                    [styles.active]: sort === SortEnum.Price
                })}
            >
                <SortIcon className={styles.sortIcon} />По цене
            </span>
        </div>
    );
}