import { Empty, Flex, Table, Tag, Typography, theme } from 'antd'
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
        <Table
          rowKey="slug"
          pagination={false}
          dataSource={prototypes}
          columns={[
            {
              title: 'Прототип',
              render: (_, p) => (
                <Flex vertical>
                  <Link to={`/${p.slug}`}>{p.title}</Link>
                  <Typography.Text type="secondary">{p.description}</Typography.Text>
                </Flex>
              ),
            },
            {
              title: 'Статус',
              width: 160,
              render: (_, p) => <Tag color={statusColor[p.status]}>{statusLabel[p.status]}</Tag>,
            },
          ]}
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
