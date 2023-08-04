import { render, screen } from "@testing-library/react";
import Artist from 

test("should equal render artist page", async () => {
  let params = { id: "1" };
  render(await Artist({ params }));
  screen.debug();
});
