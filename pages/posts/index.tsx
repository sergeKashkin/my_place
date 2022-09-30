import { GetServerSideProps } from "next";
import React from "react";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import Header from "../../components/Header/Header";
import { articleFull, DataService } from "../../services/data/data.service";
import styles from "./PostsPage.module.scss";

const dataService = new DataService();

export interface Props {
    articles: articleFull[];
}

const Posts = (props: Props) => {
    const pagetitle: string = "Posts";
    const pageSubtitle: string = "you may be interested in.";

    const generateArticlePreview = (articlePreviews: articleFull[]) => {
        return articlePreviews.map((articlePreview: articleFull) => (
            <ArticlePreview {...articlePreview} key={articlePreview.id}></ArticlePreview>
        ));
    };

    return (
        <>
            <Header title={pagetitle} subtitle={pageSubtitle}></Header>
            <div className={styles.postsPage}>
                {
                    generateArticlePreview(props.articles)
                }
            </div>
        </>
    );
};

export default Posts;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const articles: articleFull[] = await dataService.getArticles();
    
    return {
      props: {
        articles: articles,
      }
    };
};