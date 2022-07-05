import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = ({ characters }: any) => {
  const initState = characters;
  const [character, setCharacter] = useState(initState);

  useEffect(() => {
    console.log(character[0]);
  }, [character]);
  return (
    <div>
      <h1 className="text-4xl text-center font-bold text-white bg-slate-400">
        Rick And Morty
      </h1>
      <div className="w-screen">
        <div className=" max-w-2xl mx-auto"></div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 3) {
          results {
            name
          }
        }
      }
    `,
  });
  return {
    props: {
      characters: data.characters.results,
    },
  };
}

export default Home;
