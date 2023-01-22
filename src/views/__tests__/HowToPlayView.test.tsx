import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  type RenderResult,
} from "@testing-library/vue";
import HowToPlayView from "@/views/HowToPlayView.vue";

describe("<HowToPlayView />", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(HowToPlayView);
  });

  afterEach(() => {
    cleanup();
  });

  it("Correctly render", () => {
    expect(screen.getByText(/Cómo jugar/i)).toBeDefined();
  });

  it("The button 'Entendido' must have the active class", () => {
    const { container } = renderResult;

    const button = container.querySelector(".active");

    expect(button).toBeDefined();
  });

  it("Pressing 'Entendido' redirects to Home", async () => {
    const button = screen.getByText(/Entendido/i);

    expect(button).toBeDefined();

    await fireEvent.click(button);

    expect(location.pathname).toEqual("/");
  });

  it("When you hover over the 'Entendido' button, you still have the class active.", async () => {
    const { container } = renderResult;

    const button = screen.getByText(/Entendido/i);

    await fireEvent.mouseEnter(button);

    const buttonState = container.querySelector(".active");

    expect(buttonState).toBeDefined();
  });
});
