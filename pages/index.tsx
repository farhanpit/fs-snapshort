import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { Fragment, useEffect } from "react";
import { getGallerys } from "@/helper/api-util";
import GalleryList from "@/components/gallery/GalleryList";

const inter = Inter({ subsets: ["latin"] });

function HomePage(props: any) {
  return (
    <Fragment>
      <Head>
        <title>React Snapshot</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          href="../../public/icons/icon-96x96.png"
          sizes="57x57"
        />
        <link
          rel="apple-touch-icon"
          href="../../public/icons/icon-128x128.png"
          sizes="60x60"
        />
        <link
          rel="apple-touch-icon"
          href="../../public/icons/icon-144x144.png"
          sizes="72x72"
        />
      </Head>
      <div className="gallery-container-img">
        <GalleryList galleryItems={props.data} />
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const data = await getGallerys();
  return {
    props: {
      data: data,
    },
    revalidate: 1,
  };
}

export default HomePage;
