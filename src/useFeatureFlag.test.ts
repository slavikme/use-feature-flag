import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import useFeatureFlag from "./useFeatureFlag";

describe("useFeatureFlag", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useFeatureFlag("test-flag"));

    expect(result.current[0]).toBe(false);
    expect(localStorage.getItem("FF_test-flag")).toBe("false");
  });

  it("should initialize with custom initial value", () => {
    const { result } = renderHook(() => useFeatureFlag("test-flag", true));

    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem("FF_test-flag")).toBe("true");
  });

  it("should initialize with options only", () => {
    const { result } = renderHook(() =>
      useFeatureFlag("test-flag", {
        prefix: "FEATURE_",
        storeOnInit: false,
      })
    );

    expect(result.current[0]).toBe(false);
    expect(localStorage.getItem("FEATURE_test-flag")).toBeNull();
  });

  it("should initialize with initial value and options", () => {
    const { result } = renderHook(() =>
      useFeatureFlag("test-flag", true, {
        prefix: "FEATURE_",
        storeOnInit: true,
      })
    );

    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem("FEATURE_test-flag")).toBe("true");
  });

  it("should update value and localStorage", () => {
    const { result } = renderHook(() => useFeatureFlag("test-flag"));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem("FF_test-flag")).toBe("true");
  });

  it("should not store initial value when storeOnInit is false", () => {
    const { result } = renderHook(() =>
      useFeatureFlag("test-flag", {
        storeOnInit: false,
      })
    );

    expect(result.current[0]).toBe(false);
    expect(localStorage.getItem("FF_test-flag")).toBeNull();
  });

  it("should use custom prefix", () => {
    const { result } = renderHook(() =>
      useFeatureFlag("test-flag", {
        prefix: "CUSTOM_",
      })
    );

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem("CUSTOM_test-flag")).toBe("true");
  });
});
