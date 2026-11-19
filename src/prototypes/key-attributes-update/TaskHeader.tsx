import { CloseCircleOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Layout, Modal, Select, Space, Tag, Typography, theme } from 'antd'
import { useState } from 'react'
import { PEOPLE, TASK } from './data'

export type TaskStatus = 'assigned' | 'inProgress' | 'done' | 'cancelled'

export const STATUS_META: Record<TaskStatus, { label: string; color: string }> = {
  assigned: { label: 'Назначена', color: 'default' },
  inProgress: { label: 'В работе', color: 'processing' },
  done: { label: 'Завершена', color: 'success' },
  cancelled: { label: 'Отменена', color: 'error' },
}

interface Props {
  status: TaskStatus
  responsible: string
  onReassign: (person: string) => void
  onCancel: () => void
}

export default function TaskHeader({ status, responsible, onReassign, onCancel }: Props) {
  const { token } = theme.useToken()
  const [open, setOpen] = useState(false)
  const [person, setPerson] = useState<string>()
  const finished = status === 'done' || status === 'cancelled'
  const meta = STATUS_META[status]

  const close = () => {
    setOpen(false)
    setPerson(undefined)
  }

  return (
    <Layout.Header
      style={{
        height: 'auto',
        lineHeight: 'normal',
        padding: `${token.paddingMD}px ${token.paddingLG}px`,
        background: token.colorBgContainer,
        borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
      }}
    >
      <Flex justify="space-between" align="flex-start" gap={token.marginLG}>
        <Flex vertical gap={token.marginXXS}>
          <Flex align="center" gap={token.marginSM}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Задача №{TASK.number}
            </Typography.Title>
            <Tag color={meta.color} style={{ margin: 0 }}>
              {meta.label}
            </Tag>
          </Flex>
          <Flex align="center" wrap>
            <Typography.Text type="secondary">Дата: {TASK.createdDate}</Typography.Text>
            <Divider orientation="vertical" />
            <Typography.Text type="secondary">Тип: {TASK.type}</Typography.Text>
            <Divider orientation="vertical" />
            <Typography.Text type="secondary">Ответственный: {responsible}</Typography.Text>
          </Flex>
        </Flex>
        <Space>
          <Button icon={<UserSwitchOutlined />} disabled={finished} onClick={() => setOpen(true)}>
            Переназначить
          </Button>
          <Button danger icon={<CloseCircleOutlined />} disabled={finished} onClick={onCancel}>
            Отменить
          </Button>
        </Space>
      </Flex>

      <Modal
        open={open}
        title="Переназначить задачу"
        okText="Переназначить"
        cancelText="Отмена"
        okButtonProps={{ disabled: !person }}
        onOk={() => {
          if (person) onReassign(person)
          close()
        }}
        onCancel={close}
        destroyOnHidden
      >
        <Typography.Paragraph type="secondary">
          Выберите сотрудника, которому будет передана задача №{TASK.number}.
        </Typography.Paragraph>
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Выберите сотрудника"
          value={person}
          onChange={setPerson}
          options={PEOPLE.filter((p) => p !== responsible).map((p) => ({ value: p, label: p }))}
        />
      </Modal>
    </Layout.Header>
  )
}
