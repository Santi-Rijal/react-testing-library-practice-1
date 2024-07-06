import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";
import { act } from "react";

const fillFormAndSubmit = (callback) => {
  render(<UserForm onUserAdd={callback} />);

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

  return { nameInput, emailInput };
};

test("there are 2 inputs and 1 button", () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole("textbox");
  const addBtn = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(addBtn).toBeInTheDocument();
});

test("it calls onUserAdd callback fn when form is submitted", () => {
  const onUserAddMock = jest.fn();

  fillFormAndSubmit(onUserAddMock);

  expect(onUserAddMock).toHaveBeenCalled();
  expect(onUserAddMock).toHaveBeenCalledWith({
    name: "Santi",
    email: "123@dal.ca",
  });
});

test("input are empty after form submit", () => {
  const { nameInput, emailInput } = fillFormAndSubmit(() => {});

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
