import {
  ApartmentOutlined,
  AppstoreOutlined,
  AuditOutlined,
  BankOutlined,
  BarChartOutlined,
  BookOutlined,
  FileTextOutlined,
  HomeOutlined,
  SafetyOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

// Каркас: свёрнутое боковое меню (раскрыть нельзя). Состав пунктов — заглушки.
export default function Shell({ children }: { children: ReactNode }) {
  const { token } = theme.useToken()
  const navigate = useNavigate()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider
        collapsed
        collapsible={false}
        collapsedWidth={64}
        theme="light"
        style={{ borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}` }}
      >
        <Menu
          mode="inline"
          inlineCollapsed
          selectedKeys={['collateral']}
          onClick={({ key }) => key === 'home' && navigate('/')}
          style={{ borderInlineEnd: 'none' }}
          items={[
            { key: 'home', icon: <HomeOutlined />, label: 'Главная' },
            { key: 'tasks', icon: <AppstoreOutlined />, label: 'Задачи' },
            { key: 'clients', icon: <BankOutlined />, label: 'Клиенты' },
            { key: 'contracts', icon: <FileTextOutlined />, label: 'Договоры' },
            { key: 'collateral', icon: <SafetyOutlined />, label: 'Залоги' },
            { key: 'valuation', icon: <AuditOutlined />, label: 'Оценка' },
            { key: 'structure', icon: <ApartmentOutlined />, label: 'Структура' },
            { key: 'reports', icon: <BarChartOutlined />, label: 'Отчёты' },
            { key: 'dictionaries', icon: <BookOutlined />, label: 'Справочники' },
            { key: 'settings', icon: <SettingOutlined />, label: 'Настройки' },
          ]}
        />
      </Layout.Sider>
      <Layout>{children}</Layout>
    </Layout>
  )
}
