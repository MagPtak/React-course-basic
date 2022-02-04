import { getMinutesAndSecondFromDurationInSeconds } from "../../lib/time";
describe("getMinutesAndSecondFromDurationInSeconds", () => {
  describe("for durations shorter than one minute", () => {
    it("works for 30 seconds", () => {
      expect(getMinutesAndSecondFromDurationInSeconds(30)).toEqual([0, 30]);
    });

    it("returns 30 seconds for 30 seconds-duration", () => {
      expect(getMinutesAndSecondFromDurationInSeconds(30)[1]).toBe(30);
    });

    it("returns 0 minutes for 30 seconds-duration", () => {
      expect(getMinutesAndSecondFromDurationInSeconds(30)[0]).toBe(0);
    });
  });

  describe("for durations longer than one minite", () => {
    it("returns 2 minutes and 20 seconds for 140 seconds-duration", () => {
      expect(getMinutesAndSecondFromDurationInSeconds(140)).toEqual([2, 20]);
    });
  });
});
