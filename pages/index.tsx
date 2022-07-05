import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useTab } from "@mui/base";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

const Home: NextPage = ({ characters }: any) => {
  const initState = characters;
  const [character, setCharacter] = useState(initState);
  const [search, setSearch] = useState<string>("");
  const { addToast } = useToasts();
  useEffect(() => {
    console.log(character[0]);
  }, [character]);
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl py-4 text-center font-bold text-white bg-green-400">
        Rick And Morty
      </h1>
      <div className="my-[1rem] mx-auto border-2 rounded-sm">
        <form
          onSubmit={async (e: any) => {
            e.preventDefault();
            const result = await fetch("/api/search", {
              method: "POST",
              body: search,
            });

            const { characters, error } = await result.json();
            setCharacter(characters);
          }}
        >
          <fieldset className="w-full space-y-1 ">
            <label htmlFor="Search" className="hidden">
              Search
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  title="search"
                  className="p-1 focus:outline-none focus:ring"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 "
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                  </svg>
                </button>
              </span>
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                type="text"
                name="Search"
                placeholder="Search..."
                className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none   focus: focus:"
              />
            </div>
          </fieldset>
        </form>
      </div>
      <div className="w-screen">
        <div className="max-w-2xl mx-auto flex flex-wrap">
          {character.map((char: any, index: number) => (
            <div key={index} className="h-[10rem] w-[10rem] p-1">
              <Image
                src={char["image"]}
                alt="character image"
                width={300}
                height={300}
                className=" rounded-lg"
              />
            </div>
          ))}
        </div>
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
        characters {
          results {
            name
            image
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
