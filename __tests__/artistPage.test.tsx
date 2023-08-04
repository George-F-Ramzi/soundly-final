import { render, screen } from "@testing-library/react";
import Artist from "../app/artist/[id]/page";

//@ts-ignore
async function resolvedComponent(Component, props) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe("Artist", () => {
  it("Should Contain The Follow Button", async () => {
    const Page = await resolvedComponent(Artist, {
      params: { id: "1" },
    });
    render(<Page />);

    let button = screen.getByRole("follow");

    expect(button).toBeInTheDocument();
  });
  it("Should Contain The Artist Data", async () => {
    const Page = await resolvedComponent(Artist, {
      params: { id: "1" },
    });
    render(<Page />);

    let name = screen.getByRole("artist__name");
    let followers = screen.getByRole("artist__followers");
    let following = screen.getByRole("artist__following");
    let songs = screen.getByRole("artist__songs");

    expect(name).toHaveTextContent("George Ramzi");
    expect(followers).toHaveTextContent("665 Followers");
    expect(following).toHaveTextContent("43 Following");
    expect(songs).toHaveTextContent("1 Songs");
  });
});
