import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";
import HowToPlayView from "@/views/HowToPlayView.vue";

let content: Element;

describe("<HowToPlayView />", () => {
  content = render(HowToPlayView).container;

  it("Correctly render", () => {
    expect(screen.getByText(/Cómo jugar/i)).toBeDefined();
  });

  it("The button 'Entendido' must have the active class", () => {
    const button = content.querySelector(".active");

    expect(button).toBeDefined();
  });

  it("Pressing 'Entendido' redirects to Home", async () => {
    const button = screen.getByText(/Entendido/g);

    expect(button).toBeDefined();

    await fireEvent.click(button);

    expect(location.pathname).toEqual("/");
  });
});
