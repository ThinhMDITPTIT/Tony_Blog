import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_TONYBLOG_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const results = await request(graphqlAPI, query);

  return results.postsConnection.edges;
};

// Accepting a slug that's going to be a string
// raw: give access to the post's content
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const results = await request(graphqlAPI, query, { slug });

  return results.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts (
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const results = await request(graphqlAPI, query);

  return results.posts;
};

export const getSimiliarPosts = async (slug, categories) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const results = await request(graphqlAPI, query, { slug, categories });

  return results.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const results = await request(graphqlAPI, query);

  return results.categories;
};

export const submitComment = async (obj) => {
  const result = await fetch('api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};
