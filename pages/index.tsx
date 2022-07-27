import styles from '../styles/Home.module.css';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';
import Bio from '../components/Bio/Bio';
import { Saint } from '../components/Bio/interfaces';

const saintsQueryDocument = gql`
  query {
    saint {
      name
      image_main {
        id
      }
      biography
      birth_date
      birth_location
      death_date
      death_location
      photos {
        directus_files_id {
          id
        }
      }
    }
  }
`;

const getSaints = async () => {
  const { saint } = await request(
    'https://4hi7oa87.directus.app/graphql',
    saintsQueryDocument
  );
  return saint;
};

const Home = () => {
  const { data } = useQuery(['saints'], getSaints);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {data?.map((saint: Saint, i: number) => (
          <Bio key={i} {...saint} />
        ))}
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['saints'], getSaints);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
