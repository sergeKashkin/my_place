import react from "react";
import styles from "./Header.module.scss";

interface Props {
    title: string;
    subtitle: string;
}

const HomeHeader: React.FC<Props> = (headerProps: Props) => {
    return (
        <header className={styles.headerComponent}>
            <h1 className={styles.title}>{headerProps.title}</h1>
            <p className={styles.subtitle}>
            {headerProps.subtitle}
            </p>
        </header>
    );
}

export default HomeHeader;