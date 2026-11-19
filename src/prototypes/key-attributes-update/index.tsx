import { App as AntApp, Layout, Tabs } from 'antd'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PledgeItemsTab from './PledgeItemsTab'
import Shell from './Shell'
import TaskHeader, { type TaskStatus } from './TaskHeader'
import UpdateAttributesTab, { type Stage } from './UpdateAttributesTab'
import { CURRENT_RESPONSIBLE, ITEMS_AFTER, ITEMS_BEFORE, TASK } from './data'

export default function KeyAttributesUpdate() {
  const { modal, notification } = AntApp.useApp()
  const navigate = useNavigate()
  const [status, setStatus] = useState<TaskStatus>('assigned')
  const [responsible] = useState(CURRENT_RESPONSIBLE)
  const [stage, setStage] = useState<Stage>({ kind: 'idle' })

  // Первое действие над задачей переводит её из «Назначена» в «В работе»
  const onStarted = useCallback(() => setStatus((s) => (s === 'assigned' ? 'inProgress' : s)), [])
  const onCompleted = useCallback(() => setStatus('done'), [])

  const reassign = (person: string) => {
    navigate('/')
    notification.success({
      title: 'Задача переназначена',
      description: `Задача №${TASK.number} передана сотруднику: ${person}`,
      placement: 'topRight',
    })
  }

  const cancel = () =>
    modal.confirm({
      title: 'Отменить задачу?',
      content: `Задача №${TASK.number} будет отменена. Это действие нельзя отменить.`,
      okText: 'Отменить задачу',
      okButtonProps: { danger: true },
      cancelText: 'Назад',
      onOk: () => setStatus('cancelled'),
    })

  return (
    <Shell>
      <TaskHeader status={status} responsible={responsible} onReassign={reassign} onCancel={cancel} />
      <Layout.Content>
        <Tabs
          defaultActiveKey="update"
          tabBarStyle={{ paddingInline: 24, marginBottom: 0 }}
          items={[
            {
              key: 'update',
              label: 'Обновление атрибутов',
              children: (
                <UpdateAttributesTab
                  status={status}
                  stage={stage}
                  setStage={setStage}
                  onStarted={onStarted}
                  onCompleted={onCompleted}
                />
              ),
            },
            {
              key: 'items',
              label: 'Предметы залога',
              children: <PledgeItemsTab items={status === 'done' ? ITEMS_AFTER : ITEMS_BEFORE} />,
            },
          ]}
        />
      </Layout.Content>
    </Shell>
  )
}
