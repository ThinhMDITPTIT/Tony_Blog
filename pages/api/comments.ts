// Any file inside the folder pages/api is mapped to /api/* and will be treated as an API endpoint instead of a page
// => Can create the backend within Next.js application
// => This file is going to be an endpoint to '/api/comments'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_TONYBLOG_ENDPOINT;
const graphCmsTOKEN = process.env.TONYBLOG_TOKEN;

type Data = {
  name: string;
};

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<Data | unknown>
) {
  const { name, email, content, slug } = req.body;

  const graphQLClient: GraphQLClient = new GraphQLClient(graphqlAPI!, {
    headers: {
      authorization: `Bearer ${graphCmsTOKEN}`,
    },
  });

  // When use 'mutation' in graphQL that simply means that we're going to update some data or add some new data like a new comment
  // To accept params => use dollar sign $
  // When run this query => going to create a new comment inside of the graphCMS Dashboard
  // # Connent the comment + name + email to a specific post that the user commented on
  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $content: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          content: $content
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, {
      name,
      email,
      content,
      slug,
    });

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
