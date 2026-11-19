import { Empty, List, Tag, Typography, theme } from 'antd'
import { Link, Route, Routes } from 'react-router-dom'
import { prototypes } from './prototypes/registry'

const statusColor = { draft: 'default', review: 'processing', ready: 'success' } as const
const statusLabel = { draft: 'Черновик', review: 'На ревью', ready: 'Готов' } as const

function Home() {
  const { token } = theme.useToken()
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: token.paddingXL }}>
      <Typography.Title level={2}>Прототипы</Typography.Title>
      {prototypes.length === 0 ? (
        <Empty description="Прототипов пока нет" />
      ) : (
        <List
          bordered
          dataSource={prototypes}
          renderItem={(p) => (
            <List.Item extra={<Tag color={statusColor[p.status]}>{statusLabel[p.status]}</Tag>}>
              <List.Item.Meta
                title={<Link to={`/${p.slug}`}>{p.title}</Link>}
                description={p.description}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {prototypes.map((p) => (
        <Route key={p.slug} path={`/${p.slug}/*`} element={<p.component />} />
      ))}
    </Routes>
  )
}
