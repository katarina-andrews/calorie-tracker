import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("loads andd displays the title Calorie Tracker", () => {
  render(<App />);

  expect(screen.getByText("Calorie Tracker", { exact: false }));
});