import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

test("there are 2 inputs and 1 button", () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole("textbox");
  const addBtn = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(addBtn).toBeInTheDocument();
});

test("it calls onUserAdd callback fn when form is submitted", () => {
  const onUserAddMock = jest.fn();

  render(<UserForm onUserAdd={onUserAddMock} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  userEvent.click(nameInput);
  userEvent.keyboard("Santi");

  userEvent.click(emailInput);
  userEvent.keyboard("123@dal.ca");

  const addBtn = screen.getByRole("button");

  userEvent.click(addBtn);

  expect(onUserAddMock).toHaveBeenCalled();
  expect(onUserAddMock).toHaveBeenCalledWith({
    name: "Santi",
    email: "123@dal.ca",
  });
});
