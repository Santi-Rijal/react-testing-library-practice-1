import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

const renderComponent = () => {
  const users = [
    {
      name: "Santi",
      email: "123@dal.ca",
    },
    {
      name: "Mike",
      email: "mike@dal.ca",
    },
  ];

  render(<UserList users={users} />);

  return { users };
};

test("render one row per user", () => {
  renderComponent();

  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  expect(rows).toHaveLength(2);
});

test("render one row per user", () => {
  const { users } = renderComponent();

  users.map((user) => {
    const name = screen.getByRole("cell", { name: user?.name });
    const email = screen.getByRole("cell", { name: user?.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
