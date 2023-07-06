import NavBar from "@/components/navBar";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/db/db";
import { Artists, Songs } from "@/db/schema";
import { IArtist, ISong } from "@/utils/types";
import { eq } from "drizzle-orm";
import SongSection from "@/components/songsSection";
import ArtistsSection from "@/components/artistsSection";

export const revalidate = 10;

export default async function Home() {
  let discover = await db
    .select({
      id: Songs.id,
      username: Artists.name,
      cover: Songs.cover,
      song: Songs.song,
      likes: Songs.likes,
      name: Songs.name,
      artist: Songs.artist,
    })
    .from(Songs)
    .leftJoin(Artists, eq(Artists.id, Songs.artist))
    .limit(8);

  let artists = await db
    .select({
      id: Artists.id,
      name: Artists.name,
      followers: Artists.followers,
      following: Artists.follwoing,
      songs: Artists.songs,
      cover: Artists.cover,
    })
    .from(Artists)
    .limit(8);

  return (
    <main className="text-white mb-20">
      <NavBar />
      <section className="sm:h-[364px] sm:pb-11 pb-6 h-[219px] px-6 pt-8 sm:pt-20 sm:px-10 relative mt-8 rounded-2xl bg-[#950101]">
        <div className="flex h-full flex-col">
          <h2 className="font-bold text-xl ml-0 mb-2  sm:mb-[6px] sm:text-[40px] sm:-ml-[2px] leading-[150%]">
            Upcoming Stars
            <br />
            Upload To Soundly
          </h2>
          <p className="text-[#CCCCCC] grow text-base">Start Uploading Now</p>
          <Link
            className="bg-button rounded-full text-black font-bold w-fit text-base px-8 py-3"
            href={"/upload"}
          >
            Upload
          </Link>
        </div>

        <Image
          className="absolute w-[148px] h-[220px]  bottom-0 right-0 sm:w-[247px] sm:h-[369px]"
          alt="Artist Photo"
          height={369}
          width={247}
          quality={100}
          src={"/landing-photo.png"}
        />
      </section>
      <SongSection
        data={discover as ISong[]}
        title={"Discover"}
      />
      <ArtistsSection
        data={artists as IArtist[]}
        title={"Popular"}
      />
    </main>
  );
}
