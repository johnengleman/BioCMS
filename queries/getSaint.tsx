import { request, gql } from 'graphql-request';

const query = gql`
  query getSaint($id: GraphQLStringOrFloat!) {
    saint(filter: { id: { _eq: $id } }) {
      id
      name
      summary
      biography
      birth_date
      death_date
      birth_location
      death_location
      photos {
        directus_files_id {
          id
        }
      }
    }
  }
`;

export const getSaint = async (id?: string) => {
  const { saint } = await request(
    'https://4hi7oa87.directus.app/graphql',
    query,
    { id }
  );
  return saint[0];
};
