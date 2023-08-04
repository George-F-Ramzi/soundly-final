import { render, screen } from "@testing-library/react";
import Artist from "../app/artist/[id]/page";

test("should render artist page", async () => {
  let params = { id: "1" };
  render(await Artist({ params }));
  screen.debug();
});
