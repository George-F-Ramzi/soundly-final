import { render, screen } from "@testing-library/react";
import SongCard from "../components/Cards/songCard";
import { ISong } from "@/utils/types";

let data: ISong = {
  artist: 1,
  cover:
    "https://uploadthing.com/f/523f3ebe-99bb-40e6-b244-ad1e4bd5651a_329587328_674156217731059_2982671001599147091_n.jpg",
  id: 1,
  likes: 324,
  name: "The Song",
  song: "https://uploadthing.com/f/523f3ebe-99bb-40e6-b244-ad1e4bd5651a_329587328_674156217731059_2982671001599147091_n.jpg",
  username: "George",
};

describe("Song Card", () => {
  it("Should Render The Provided Data", async () => {
    render(<SongCard data={data} />);

    let name = screen.getByRole("songCard__name");
    let username = screen.getByRole("songCard__username");
    let cover = screen.getByRole("songCard__cover");

    expect(name).toHaveTextContent("The Song");
    expect(username).toHaveTextContent("George");
    expect(cover).toHaveAttribute("src");
  });
});
