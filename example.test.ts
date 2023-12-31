import { describe, expect, test, vi } from "vitest";
import { testFn } from "./utils";

describe("functions", () => {
  test("create a mock function", () => {
    const callback = vi.fn();
    testFn(12, callback);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(12);
  });

  test("spy on method", () => {
    const obj = {
      getName: () => 1,
    };

    const spy = vi.spyOn(obj, "getName");
    obj.getName();
    expect(spy).toHaveBeenCalled();
    obj.getName();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test("mock third part module", async () => {});
});
