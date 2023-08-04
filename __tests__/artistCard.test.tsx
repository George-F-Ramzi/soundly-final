import { render, screen } from "@testing-library/react";
import ArtistCard from "../components/Cards/artistCard";
import { IArtist } from "@/utils/types";

let data: IArtist = {
  id: 1,
  cover:
    "https://uploadthing.com/f/523f3ebe-99bb-40e6-b244-ad1e4bd5651a_329587328_674156217731059_2982671001599147091_n.jpg",
  name: "George",
  followers: 2334,
  following: 3423,
  songs: 2,
};

describe("Song Card", () => {
  it("Should Render The Provided Data", async () => {
    render(<ArtistCard data={data} />);

    let name = screen.getByRole("artistCard__name");
    let followers = screen.getByRole("artistCard__followers");
    let cover = screen.getByRole("artistCard__cover");

    expect(name).toHaveTextContent("George");
    expect(followers).toHaveTextContent("2334");
    expect(cover).toHaveAttribute("src");
  });
});
