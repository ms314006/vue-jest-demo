import { render, fireEvent } from '@testing-library/vue';
import store from "../../src/store/actions";
import Actions from "../../src/views/Actions.vue";

const renderActionsComponent = customStore => (
  render(Actions, { store: { ...store, ...customStore } })
);

describe("Actions.vue", () => {
  it("shwo Hi, You can input text, exchange me.", () => {
    const { getByTestId } = renderActionsComponent();

    const promptText = getByTestId("promptText");

    expect(promptText.innerHTML).toBe("Hi, You can input text, exchange me.");
  });

  it('dispatches "actionInput" when input event value is "input"', async () => {
    const { getByLabelText, getByTestId } = renderActionsComponent();

    const xxxxInput = getByLabelText("xxxx");
    await fireEvent.input(xxxxInput, { target: { value: "input" } });

    const promptText = getByTestId("promptText");
    expect(promptText.innerHTML).toBe("input");
  });

  it('does not dispatch "actionInput" when event value is not "input"', async () => {
    const { getByLabelText, getByTestId } = renderActionsComponent();

    const xxxxInput = getByLabelText("xxxx");
    await fireEvent.input(xxxxInput, { target: { value: "not input" } });

    const promptText = getByTestId("promptText");
    expect(promptText.innerHTML).toBe("");
  });

  it('calls store action "actionClick" when button is clicked', async () => {
    const { getByText, getByTestId } = renderActionsComponent();

    const button = getByText("Click");
    await fireEvent.click(button);

    const promptText = getByTestId("promptText");
    expect(promptText.innerHTML).toBe("input!!");
  });
});
