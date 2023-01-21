import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";

import HomeView from "../HomeView.vue";

let content: Element;

describe("<HomeView />", () => {
  content = render(HomeView).container;

  it("Correctly render", () => {
    expect(screen.getByText("Matatena")).toBeDefined();
  });

  it("A only button have the active class", () => {
    const bgButtons = content.querySelectorAll(".styleButtonMenu");

    const cantActive = Array.from(bgButtons).reduce((cur, val) => {
      return val.classList.contains("active") ? cur + 1 : cur;
    }, 0);

    expect(cantActive).toEqual(1);
  });

  it("Hovering the mouse over a button adds the active class.", () => {
    const buttons = content.querySelectorAll("[data-option]");

    fireEvent.mouseEnter(buttons[1]);

    const bgButtons = content.querySelectorAll(".styleButtonMenu");

    const listClasses = Array.from(bgButtons[1].classList);

    expect(listClasses).toContain("active");
  });

  it("When hovering over a button, there should only be one active class.", () => {
    const buttons = content.querySelectorAll("[data-option]");

    fireEvent.mouseEnter(buttons[1]);

    const bgButtons = Array.from(content.querySelectorAll(".styleButtonMenu"));

    const cantActiveClass = bgButtons.reduce((cur, val) => {
      return val.classList.contains("active") ? cur + 1 : cur;
    }, 0);

    expect(cantActiveClass).toEqual(1);
  });
});
