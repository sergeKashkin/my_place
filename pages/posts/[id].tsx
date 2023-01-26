/* eslint react/prop-types: 0 */
import { GetServerSideProps } from "next";
import React from "react";
import { articleFull, DataService } from "../../services/data/data.service";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from "./PostPage.module.scss";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
const dataService = new DataService();

export interface Props {
    article: articleFull;
}

const PostPage = (props: Props) => {
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
                            components={{
                                code({node, inline, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || "")
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            // @ts-expect-error improper type of syntax-highlighter
                                            style={materialDark}
                                            lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                                            language={match[1]}
                                            PreTag="div"
                                            wrapLines={true}
                                            showLineNumbers={true}
                                            showInlineLineNumbers={true}
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                                a: ({...props}) => <a className={styles.articleLink} {...props}/>,
                                img: ({...props}) => <img className={styles.articleImg} {...props}/>
                            }}
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