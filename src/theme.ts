import type { ThemeConfig } from 'antd'
import { theme } from 'antd'

// Светлая тема, белый интерфейс, синий акцент. Единственное место настройки токенов.
export const appTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1677ff',
    colorBgLayout: '#ffffff',
    colorBgContainer: '#ffffff',
  },
}
