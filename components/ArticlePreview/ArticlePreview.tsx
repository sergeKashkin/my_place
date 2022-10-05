import Image from "next/image";
import Link from "next/link";
import React from "react";
import { articlePreview } from "../../services/data/data.service";
import styles from "./ArticlePreview.module.scss";

const ArticlePreview: React.FC<articlePreview> = (articlePreview: articlePreview) => {
    return (
        <Link href={`/posts/${articlePreview.id}`}>
            <div className={styles.articlePreview}>
                <div className={styles.imageContainer}>
                    <Image src={articlePreview.media[0]}></Image>
                </div>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>
                        {articlePreview.title}
                    </div>
                    <div className={styles.date}>
                        {new Date(articlePreview.createdAt).toLocaleDateString()}
                    </div>
                </div> 
                <div className={styles.subtitleContainer}>
                    {articlePreview.description}
                </div>     
            </div>
        </Link>
    );
}

export default ArticlePreview;