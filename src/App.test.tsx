import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderRoute(route: string) {
  return render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>);
}

it("exposes registration through the Luma checkout button and fallback link", () => {
  renderRoute("/");

  expect(screen.getByRole("link", { name: /register for event/i })).toHaveAttribute(
    "href",
    "https://luma.com/event/evt-Bm7Z8pzyQlpYFW4",
  );
  expect(screen.getByRole("link", { name: /register for event/i })).toHaveAttribute("data-luma-event-id", "evt-Bm7Z8pzyQlpYFW4");
});

it("filters schedule sessions by topic", async () => {
  const user = userEvent.setup();
  renderRoute("/schedule");

  await user.type(screen.getByPlaceholderText(/search sessions/i), "MCP");

  expect(screen.getByRole("heading", { name: "MCP Workshop" })).toBeInTheDocument();
  expect(screen.getByText("1 sessions")).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "A2A Workshop" })).not.toBeInTheDocument();
});

it("announces the student poster submission until its external form is configured", () => {
  renderRoute("/resources");

  expect(screen.getByText("Submission opens soon")).toHaveAttribute("aria-disabled", "true");
});

it("renders a route without returning a cleanup value from the scroll effect", () => {
  const { unmount } = renderRoute("/");

  expect(screen.getByRole("heading", { name: /build agents for/i })).toBeInTheDocument();
  expect(() => unmount()).not.toThrow();
});

it("shows the summit operational committees", () => {
  renderRoute("/community");

  expect(screen.getByRole("heading", { name: "Guest Experience & Registration" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Academic Engagement & Student Outreach" })).toBeInTheDocument();
  expect(screen.getAllByText(/attendee communications|student posters/i).length).toBeGreaterThanOrEqual(2);
  expect(screen.getAllByAltText("Agentic AI Foundation")).toHaveLength(1);
  expect(screen.getByText("Selection in progress")).toBeInTheDocument();
  expect(screen.getByText("ACM Dallas Chapter")).toBeInTheDocument();
  expect(screen.getByText("Dallas ACM SIGAI Chapter")).toBeInTheDocument();
  expect(screen.getByText("Dallas AI Agents User Group")).toBeInTheDocument();
  expect(screen.getByText("Global AI Open Source Builders")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /view sponsorship/i })).toHaveAttribute("href", "/sponsorship");
});

it("keeps sponsorship on its own page and uses the official community links", () => {
  renderRoute("/sponsorship");

  expect(screen.getByRole("heading", { name: "Hands-On Lab & Tooling" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", "https://github.com/aaif");
  expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", "https://www.linkedin.com/company/aaif-dallas/");
});
