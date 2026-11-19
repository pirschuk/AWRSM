import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App as AntApp, ConfigProvider } from 'antd'
import ru_RU from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { appTheme } from './theme'

dayjs.locale('ru')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={ru_RU} theme={appTheme}>
      <AntApp>
        <HashRouter>
          <App />
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  </StrictMode>,
)
