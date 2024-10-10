import moment from "jalali-moment";
import { dateFormate } from "../dateFormat";

describe("dateFormat", () => {
  test("format 3 months ago", () => {
    const threeMonthAgo = moment().subtract(3, "months").toISOString();
    expect(dateFormate(threeMonthAgo)).toBe("3 ماه پیش");
  });
  test("format 1 hours ago", () => {
    const twoMinutAgo = moment().subtract(1, "hours").toISOString()
    expect(dateFormate(twoMinutAgo)).toBe("1 ساعت پیش");
  });
  test("format 2 minutes ago", () => {
    const twoMinutAgo = moment().subtract(2, "minutes").toISOString()
    expect(dateFormate(twoMinutAgo)).toBe("2 دقیقه پیش");
  });
  
});
