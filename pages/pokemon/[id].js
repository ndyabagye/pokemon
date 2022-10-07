import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Details.module.css";
import Link from "next/link";
import Head from "next/head";

export async function getStaticPaths() {
  const res = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  const pokemon = await res.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );
  return {
    props: {
      pokemon: await res.json(),
    },
  };
}
// export async function getServerSideProps({ params }) {
//   const res = await fetch(
//     `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
//   );
//   return {
//     props: {
//       pokemon: await res.json(),
//     },
//   };
// }
export default function Details({ pokemon }) {
  //   const {
  //     query: { id },
  //   } = useRouter();

  //   const [pokemon, setPokemon] = useState(null);

  //   useEffect(() => {
  //     async function getPokemon() {
  //       const res = await fetch(
  //         `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
  //       );
  //       setPokemon(await res.json());
  //     }

  //     getPokemon();
  //   }, [id]);

  if (!pokemon) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{pokemon?.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>

      <div className={styles.layout}>
        <div>
          <Image
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon?.name.english}
            width="400px"
            height="400px"
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon?.name}</div>
          <div className={styles.type}>{pokemon?.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
