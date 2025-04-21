import { renderHook, act } from "@testing-library/react";
import useTheme from "./theme";

describe("useTheme hook", () => {
  test("should initialize with darkMode as false", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.darkMode).toBe(false);
    expect(result.current.theme.palette.mode).toBe("light");
    expect(result.current.theme.palette.background.default).toBe("#f0f4f8");
    expect(result.current.theme.palette.text.primary).toBe("#2d3748");
  });

  test("should toggle darkMode when toggleDarkMode is called", () => {
    const { result } = renderHook(() => useTheme());

    // Initial state is light mode
    expect(result.current.darkMode).toBe(false);

    // Toggle to dark mode
    act(() => {
      result.current.toggleDarkMode();
    });

    // Now it should be dark mode
    expect(result.current.darkMode).toBe(true);
    expect(result.current.theme.palette.mode).toBe("dark");
    expect(result.current.theme.palette.background.default).toBe("#171c26");
    expect(result.current.theme.palette.text.primary).toBe("#e1e6ef");

    // Toggle back to light mode
    act(() => {
      result.current.toggleDarkMode();
    });

    // Back to light mode
    expect(result.current.darkMode).toBe(false);
    expect(result.current.theme.palette.mode).toBe("light");
  });
});
