import { render, screen, waitFor } from "@testing-library/react";
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

    expect(Page).toContain("follow");
  });
});
