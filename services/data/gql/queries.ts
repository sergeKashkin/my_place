import { DocumentNode, gql } from "@apollo/client";

const getArticlePreviews: DocumentNode = gql`
  query GetArticles {
    articles(locale: "en", pagination: { limit: 4 }, sort: "createdAt:desc") {
      data {
        id
        attributes {
          title
          description
          date
          media {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          createdAt
        }
      }
    }
  }
`;

const getArticlesFull: DocumentNode = gql`
  query GetArticles {
    articles(locale: "en", sort: "createdAt:desc") {
      data {
        id
        attributes {
          title
          description
          content
          date
          media {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          createdAt
        }
      }
    }
  }
`;

const getArticle = gql`
    query GetArticle($id: ID!) {
      article(id: $id) {
        data {
          id
          attributes {
            title
            description
            content
            date
            media {
              data {
                attributes {
                  url
                  previewUrl
                }
              }
            }
            createdAt
          }
        }
      }
    }
`;

export { getArticlePreviews, getArticlesFull, getArticle };
