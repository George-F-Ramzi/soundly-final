import NothingHere from "@/utils/nothing";
import { IArtist } from "@/utils/types";
import React from "react";
import ArtistCard from "./Cards/artistCard";

interface Prop {
  title: String;
  data: IArtist[];
}

export default function ArtistsSection({ title, data }: Prop) {
  return (
    <section className="mt-[55px]">
      <h2 className="text-white font-bold text-4xl mb-[15px] ">{title}</h2>
      <div className="grid gap-x-8 gap-y-5 grid-cols-cards ">
        {Array.isArray(data) && data.length ? (
          data.map((song, index) => {
            return (
              <ArtistCard
                key={index}
                data={song}
              />
            );
          })
        ) : (
          <NothingHere />
        )}
      </div>
    </section>
  );
}
