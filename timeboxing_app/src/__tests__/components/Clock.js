import React from "react";
import Clock from "../../components/Clock";
import ReactDOM from "react-dom";

let root = null;
describe("<Clock />", () => {
  describe("when given minutes and seconds", () => {
    beforeEach(() => {
      root = document.createElement("div");
      ReactDOM.render(<Clock minutes={10} seconds={20} />, root);
    });
    it("renders properly", () => {
      expect(root.childNodes[0].nodeName).toEqual("H2");
      expect(root.childNodes[0].className).toMatch(/Clock/);
      expect(root.childNodes[0].textContent).toMatch(/10:20/);
    });
    it("renders an h2", () => {
      const root = document.createElement("div");
      ReactDOM.render(<Clock minutes={10} seconds={20} />, root);
      expect(root.childNodes[0].nodeName).toEqual("H2");
    });
    it("sets a Clock className", () => {
      const root = document.createElement("div");
      ReactDOM.render(<Clock minutes={10} seconds={20} />, root);
      expect(root.childNodes[0].className).toMatch(/Clock/);
    });
    it("renders time properly", () => {
      const root = document.createElement("div");
      ReactDOM.render(<Clock minutes={10} seconds={20} />, root);
      expect(root.childNodes[0].textContent).toMatch(/10:20/);
    });
  });

  it("sets className to epmty string if not given anything else", () => {
    expect(<Clock minutes={10} seconds={20} />).toEqual(
      <Clock className="" minutes={10} seconds={20} />
    );
  });
});
