import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";

interface Prop {
  toggle: (value: boolean) => void;
  id: string;
}

export default function MenuSlideout({ toggle, id }: Prop) {
  return (
    <div className="w-screen flex h-screen z-10 fixed right-0 top-0">
      <div className="bg-black w-full h-full opacity-80"></div>
      <div className="bg-[#191919]  min-w-[360px] p-8 h-full ">
        <div className="flex mb-10 items-center justify-between">
          <h2 className="text-para font-bold">Hi There!</h2>
          <RiCloseLine
            onClick={() => toggle(false)}
            width={24}
            height={24}
            className="text-para cursor-pointer w-6 h-6"
          />
        </div>
        <Link
          href={`/artist/${id}`}
          onClick={() => toggle(false)}
          className="border rounded w-full flex items-center justify-center  h-12 border-default text-white font-bold"
        >
          Profile
        </Link>
        <Link
          href={`/inbox`}
          onClick={() => toggle(false)}
          className="border mt-4 rounded w-full flex items-center justify-center  h-12 border-default text-white font-bold"
        >
          Inbox
        </Link>
        <Link
          href={`/liked`}
          onClick={() => toggle(false)}
          className="border mt-4 rounded w-full flex items-center justify-center  h-12 border-default text-white font-bold"
        >
          Liked
        </Link>
        <Link
          href={`/upload`}
          onClick={() => toggle(false)}
          className="border mt-4 rounded w-full flex items-center justify-center  h-12 border-default text-white font-bold"
        >
          Upload
        </Link>
      </div>
    </div>
  );
}
