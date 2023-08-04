import { render, screen } from "@testing-library/react";
import Song from "../app/song/[id]/page";

//@ts-ignore
async function resolvedComponent(Component, props) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe("Song Page", () => {
  it("Should Contain The Like Button", async () => {
    const Page = await resolvedComponent(Song, {
      params: { id: "1" },
    });
    render(<Page />);

    let button = screen.getByRole("Like");

    expect(button).toBeInTheDocument();
  });
  it("Should Contain The Song Data", async () => {
    const Page = await resolvedComponent(Song, {
      params: { id: "1" },
    });
    render(<Page />);

    let name = screen.getByRole("song__name");
    let likes = screen.getByRole("song__likes");
    let cover = screen.getByRole("song__cover");

    expect(name).toHaveTextContent("Broken");
    expect(likes).toHaveTextContent("422 Likes");
    expect(cover).toHaveAttribute("src");
  });
});
