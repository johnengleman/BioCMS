import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { gql } from '@apollo/client';
import client from '../apollo-client';
import { DocumentRenderer } from '@keystone-6/document-renderer';

interface IndexProps {
  data: any;
}

const Home: NextPage = (data: IndexProps) => {
  console.log('PROPS: ', data);

  const document = data?.saints[0]?.Bio.document;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <DocumentRenderer document={document} />
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        saints {
          Bio {
            document
          }
        }
      }
    `,
  });
  return {
    props: {
      data,
    },
  };
}

export default Home;
