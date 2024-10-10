import { secontTommss } from "../functions";

describe("secondFormat.test", () => {
  test("format 120 second to formated minuts", () => {
    expect(secontTommss(120)).toBe("02:00");
  });
  test("format 160 second to formated minuts", () => {
    expect(secontTommss(160)).toBe("02:40");
  });
  test("format 180 second to formated minuts", () => {
    expect(secontTommss(180)).toBe("03:00");
  });
  test("format 200 second to formated minuts", () => {
    expect(secontTommss(200)).toBe("03:20");
  });
});
