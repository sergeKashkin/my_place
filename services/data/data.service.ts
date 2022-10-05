import { ApolloClient, InMemoryCache, NormalizedCacheObject, ApolloQueryResult } from '@apollo/client';
import { environment } from "../../environment/dev";
import { ArticleEntity, ArticleEntityResponse, ArticleEntityResponseCollection, UploadFileEntity } from "../../src/types";
import { getArticle, getArticlePreviews, getArticlesFull } from "./gql/queries";

export interface articlePreview {
    id: number;
    title: string;
    createdAt: string;
    description: string;
    media: string[];
}

export interface articleFull extends articlePreview {
    content: string;
}

interface getArticleServerResponse {
    article: ArticleEntityResponse;
}

interface getArticlesServerResponse {
    articles: ArticleEntityResponseCollection;
}

export interface IDataService {
    getArticlesPreviews(): Promise<articlePreview[]>;
    getArticles(): Promise<articleFull[]>;
    getArticle(id: number): Promise<articleFull>;
    apolloClient: ApolloClient<NormalizedCacheObject>;
}
export class DataService implements IDataService {

    private _client: ApolloClient<NormalizedCacheObject> = null!;

    constructor() {
        this.initialize();
    }

    get apolloClient(): ApolloClient<NormalizedCacheObject> {
        return this._client;
    }

    public async getArticlesPreviews(): Promise<articlePreview[]> {
        // Gets 4 most recent article previews
        let articlePreviews: ApolloQueryResult<getArticlesServerResponse> = await this._client.query({
            query: getArticlePreviews,
        });
        
        return articlePreviews.data.articles.data.map((article: ArticleEntity): articlePreview => {
            return {
                id: Number(article.id),
                createdAt: article.attributes?.createdAt,
                description: article.attributes?.description!,
                media: article.attributes?.media?.data.map((mediaUrl: UploadFileEntity) => {
                    return `${mediaUrl.attributes?.url!}`;
                })!,
                title: article.attributes?.title!
            };
        });
    }

    public async getArticles(): Promise<articleFull[]> {
        let fullArticles: ApolloQueryResult<getArticlesServerResponse> = await this._client.query({
            query: getArticlesFull,
        });

        return fullArticles.data.articles.data.map((article: ArticleEntity): articleFull => {
            return {
                id: Number(article.id),
                title: article.attributes?.title!,
                createdAt: article.attributes?.createdAt,
                description: article.attributes?.description!,
                content: article.attributes?.content!,
                media: article.attributes?.media?.data.map((mediaUrl: UploadFileEntity) => {
                    return `${mediaUrl.attributes?.url!}`;
                })!,
            };
        });
    }

    public async getArticle(id: number): Promise<articleFull> {
        let article: ApolloQueryResult<getArticleServerResponse> = await this._client.query({
            query: getArticle,
            variables: {id: id}
        });

        return {
            id: Number(article.data.article.data?.id),
            title: article.data.article.data?.attributes?.title!,
            content:  article.data.article.data?.attributes?.content!,
            createdAt: article.data.article.data?.attributes?.createdAt!,
            description:  article.data.article.data?.attributes?.description!,
            media: article.data.article.data?.attributes?.media?.data.map((mediaUrl: UploadFileEntity) => {
                return `${environment.cmsUrl}${mediaUrl.attributes?.url!}`;
            })!
        };
    }

    private initialize(): void {
        this._client = new ApolloClient({
            uri: `${environment.cmsUrl}graphql`,
            cache: new InMemoryCache()
        });
    }
}