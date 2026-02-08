/**
 * 主题上下文 — 提供当前主题配色给所有组件
 */
import { createContext, useContext } from 'react';
import type { ThemeColors } from '../types';
import { THEMES } from '../types';

const ThemeContext = createContext<ThemeColors>(THEMES.dark.colors);

export const ThemeProvider = ThemeContext.Provider;

/** 获取当前主题配色 */
export function useTheme(): ThemeColors {
  return useContext(ThemeContext);
}
