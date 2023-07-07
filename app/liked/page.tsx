import SongsSection from "@/components/songsSection";
import { headers, cookies } from "next/headers";

export default function Liked() {
  const headersList = headers();
  const re = cookies();
  console.log(re);
  const referer = headersList.get("x-auth-token");

  return <div className="text-white">{referer}sdfds</div>;
}
