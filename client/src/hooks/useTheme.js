import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "features/theme/themeSlice";
import { useEffect } from "react";

const themeType = {
  DARK: "dark",
  DEFAULT: "default",
};

export const useTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const toggleTheme = () => {
    const newTheme =
      theme === themeType.DARK ? themeType.DEFAULT : themeType.DARK;

    localStorage.setItem("theme", newTheme);
    dispatch(setTheme(newTheme));
  };

  return {
    theme,
    toggleTheme,
  };
};
