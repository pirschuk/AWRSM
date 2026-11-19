import { Button, Flex, Typography } from 'antd'

export default function App() {
  return (
    <Flex vertical align="center" gap="middle" style={{ padding: 48 }}>
      <Typography.Title>AWRSM</Typography.Title>
      <Button type="primary">Ant Design подключён</Button>
    </Flex>
  )
}
