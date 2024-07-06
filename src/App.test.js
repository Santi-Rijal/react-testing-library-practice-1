import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { act } from "react";

test("can recive new user and show it on a list", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const addBtn = screen.getByRole("button");

  userEvent.click(nameInput);
  userEvent.keyboard("Santi");

  userEvent.click(emailInput);
  userEvent.keyboard("123@dal.ca");

  act(() => {
    userEvent.click(addBtn);
  });

  const name = screen.getByRole("cell", { name: "Santi" });
  const email = screen.getByRole("cell", { name: "123@dal.ca" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
