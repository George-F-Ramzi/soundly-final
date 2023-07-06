import { ISong } from "@/utils/types";
import NothingHere from "@/utils/nothing";
import SongCard from "./Cards/songCard";

interface Prop {
  title: String;
  data: ISong[];
}

export default function SongsSection({ title, data }: Prop) {
  return (
    <section className="mt-[55px]">
      <h2 className="text-white font-bold text-4xl mb-[15px] ">{title}</h2>
      <div className="grid gap-x-8 gap-y-5 grid-cols-cards ">
        {Array.isArray(data) && data.length ? (
          data.map((song, index) => {
            return (
              <SongCard
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
