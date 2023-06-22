import { render, screen, logRoles } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Skills } from "./Skills";
describe("Skills", () => {
  const skills = ["HTML", "CSS", "JavaScript"];
  test("renders correctly", () => {
    const view = render(<Skills skills={skills} />);
    // logRoles(view.container);
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  test("renders a list of skills", () => {
    render(<Skills skills={skills} />);
    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(skills.length);
  });

  test("renders Login button", () => {
    render(<Skills skills={skills} />);
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
  });

  test("Start Learning button is not rendered", () => {
    render(<Skills skills={skills} />);
    const startLearningButton = screen.queryByRole("button", {
      name: "Start learning",
    });
    expect(startLearningButton).not.toBeInTheDocument();
  });
  test("Start Learning button is rendered on click of login button", async () => {
    user.setup();
    render(<Skills skills={skills} />);
    const loginButton = screen.getByRole("button", { name: "Login" });
    await user.click(loginButton);
    const startLearningButton = await screen.findByRole("button", {
      name: "Start learning",
    });
    expect(startLearningButton).toBeInTheDocument();
  });

  test.skip("Start Learning button is eventually displayed", async () => {
    render(<Skills skills={skills} />);
    // screen.debug();
    const startLearningButton = await screen.findByRole(
      "button",
      {
        name: "Start learning",
      },
      {
        timeout: 3000,
      }
    );
    // screen.debug();
    expect(startLearningButton).toBeInTheDocument();
  });
});
