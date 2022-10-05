import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { articlePreview, DataService } from "../services/data/data.service";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/Header/Header";
import ArticlePreview from "../components/ArticlePreview/ArticlePreview";
import Link from "next/link";

const dataService = new DataService();

export interface Props {
  articlesPreviews: articlePreview[];
}

interface tool {
  title: string;
  icon: string;
}

const Home: NextPage<Props> = (props: Props): JSX.Element => {
  const headerTitle: string = "Welcome";
  const headerSubtitle: string = "to my place.";

  const tools: tool[] = [
    { title: "JavaScript", icon:"javascript" }, { title: "TypeScript", icon: "typescript" }, { title: "Angular", icon: "angular"},  
    { title: "React", icon:"react" }, { title: "Next.js", icon:"nextjs" }, { title: "GraphQL", icon:"graphql" }, { title: "Node.js", icon:"node-js" }, 
    { title: "Express.js", icon: "express" },{ title: "CSS", icon: "css"}, { title: "Sass", icon:"sass" }, { title: "OneSingal", icon:"onesignal" }, { title: "underscore.js", icon: "underscore-js" }, 
    { title: "Plotly", icon:"plotly" }, { title: "Docker", icon: "docker"}, { title: "Docker Compose", icon:"docker-compose"}, { title: "Jenkins", icon: "jenkins" }, 
    {title: "Git", icon:"git"}, { title: "Nginx", icon:"nginx" }, { title: "Microsoft Azure", icon: "azure"}, { title: "Amazon EC2", icon: "amazon-ec2" }, 
    { title: "Amazon S3", icon: "amazon-s3" }, {title: "Google Analytics", icon:"g-analytics"}, { title: "GitHub", icon:"github"}, { title: "Jira", icon:"jira" }, 
    { title: "Postman", icon:"postman" }, { title: "Slack", icon:"slack" }, { title: "Xcode", icon: "xcode" }, { title: "Android Studio", icon: "andr-studio" },
  ];

  const generateArticlePreview = (articlePreviews: articlePreview[]) => {
    return articlePreviews.map((articlePreview: articlePreview) => (
        <ArticlePreview {...articlePreview} key={articlePreview.id}></ArticlePreview>
    ));
  };

  return (
    <div className={styles.homePage}>
      <div id="intro" className="anchor">
        <Header title={headerTitle} subtitle={headerSubtitle}></Header>
        <div className={styles.sectionHeading}>about</div>
        <div className={styles.about}>
            <div className={styles.main}>
              <div className={styles.mainTitle}>Passionate about web technology, UI/UX, Gaming, and fun with my friends.</div>
            </div>
            <div className={styles.additional}>
              <div className={styles.entry}>
                &#129302; Full Stack Engineer at ZioNet.
              </div>
              <div className={styles.entry}>
              &#128640; Implementing the best web development practices and adopting DevOps.
              </div>
              <div className={styles.entry}>
                &#128172; If you're into web world and DevOps, hit me up.
              </div>
            </div>
        </div>
        </div>
        <div id="latest_posts" className={`${styles.sectionHeading} anchor`}>latest posts</div>
        <div className={styles.latestPostsContainer}>
            {
                generateArticlePreview(props.articlesPreviews)
            }
        </div>
        <Link href="/posts">
            <div className={styles.expandArticles}>
                <div className={styles.dot}></div>
                <div className={styles.expandTitle}>see</div>
                <div className={styles.dot}></div>
                <div className={styles.expandTitle}>more</div>
                <div className={styles.dot}></div>
            </div>
        </Link>
        <div className={`${styles.sectionHeading} anchor`} id="contact">contact</div>
        <div className={styles.about}>
            <div className={styles.main}>
              <div className={styles.mainTitle}>📱 Feel free to contact me</div>
            </div>
            <div className={styles.additional}>
              <div className={styles.entry}>
                Email: <a href="mailto:sergmaloi@gmail.com">sergmaloi@gmail.com</a>
              </div>
              <div className={styles.entry}>
              LinkedIn: <a href="https://www.linkedin.com/in/kashkin-sergei/">Kashkin Sergei</a>
              </div>
              <div className={styles.entry}>
                GitHub: <a href="https://github.com/sergeKashkin">sergeKashkin</a>
              </div>
            </div>
        </div>
        <div className={`${styles.sectionHeading} anchor`} id="toolbox">toolbox</div>
        <div className={styles.toolBox}>
            {
              tools.map((tool: tool) => <div className={styles.tool} key={tool.icon}>
                  <img src={`/icons/${tool.icon}.png`}></img>
                  <div className="title">{tool.title}</div>
                </div>
                )
            }
        </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const articlesPreview: articlePreview[] = await dataService.getArticlesPreviews();
  
  return {
    props: {
      articlesPreviews: articlesPreview,
    }
  };
};
