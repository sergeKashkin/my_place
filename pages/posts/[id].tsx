import { GetServerSideProps } from "next";
import React from "react";
import { articleFull, DataService } from "../../services/data/data.service";
import MarkdownIt from "markdown-it";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { environment } from "../../environment/dev";
import styles from "./PostPage.module.scss";

const dataService = new DataService();

export interface Props {
    article: articleFull;
}

const PostPage = (props: Props) => {
    const md = new MarkdownIt();
    const articleHtml = md.render(props.article.content);

    return (
        <div className={styles.postPage}>
            <div className={styles.post}>
                <article>
                    <header>
                        <h4>{new Date(props.article.createdAt).toLocaleDateString()}</h4>
                        <h1>{props.article.title}</h1>
                        <h2>{props.article.description}</h2>
                    </header>
                    <section>
                        <Markdown
                            className={styles.markdownContainer} 
                            remarkPlugins={[remarkGfm]}
                        >
                            {props.article.content}
                        </Markdown>
                    </section>
                </article>
            </div>
        </div>
    );
}

export default PostPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const article: articleFull = await dataService.getArticle(Number(params?.id!));
    
    return {
      props: {
        article: article,
      }
    };
};