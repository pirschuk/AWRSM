import { DownloadOutlined, InboxOutlined, ReloadOutlined } from '@ant-design/icons'
import { Alert, Button, Descriptions, Flex, Progress, Result, Spin, Table, Typography, Upload, theme } from 'antd'
import { useEffect } from 'react'
import {
  CHECK_ERRORS,
  ITEMS_BEFORE,
  TASK,
  UPDATE_ERRORS,
  buildSummary,
  type FileError,
  type SummaryRow,
} from './data'
import { downloadCsv } from './download'
import type { TaskStatus } from './TaskHeader'

export type Stage =
  | { kind: 'idle' }
  | { kind: 'checking'; fileName: string }
  | { kind: 'checkFailed'; fileName: string }
  | { kind: 'checked'; fileName: string }
  | { kind: 'updating'; fileName: string; percent: number }
  | { kind: 'updateFailed'; fileName: string }
  | { kind: 'done' }

interface Props {
  status: TaskStatus
  stage: Stage
  setStage: (s: Stage) => void
  onStarted: () => void
  onCompleted: () => void
}

const MAX_SIZE_MB = 10

const errorColumns = [
  { title: 'Строка', dataIndex: 'row', width: 100 },
  { title: 'Колонка', dataIndex: 'column', width: 220 },
  { title: 'Ошибка', dataIndex: 'message' },
]

const summaryColumns = [
  { title: 'Тип предмета залога', dataIndex: 'type' },
  { title: 'Всего залогов', dataIndex: 'total', align: 'right' as const, width: 200 },
  { title: 'Обновлено', dataIndex: 'updated', align: 'right' as const, width: 200 },
  { title: 'Не обновлено', dataIndex: 'notUpdated', align: 'right' as const, width: 200 },
]

function downloadReport(errors: FileError[]) {
  downloadCsv(`отчёт_об_ошибках_задача_${TASK.number}.csv`, [
    ['Строка', 'Колонка', 'Ошибка'],
    ...errors.map((e) => [e.row, e.column, e.message]),
  ])
}

export default function UpdateAttributesTab({ status, stage, setStage, onStarted, onCompleted }: Props) {
  const { token } = theme.useToken()
  const cancelled = status === 'cancelled'

  // Проверка файла: имитация задержки. Имя файла с «error» — файл не проходит проверку.
  useEffect(() => {
    if (stage.kind !== 'checking') return
    const fileName = stage.fileName
    const t = setTimeout(
      () => setStage({ kind: fileName.toLowerCase().includes('error') ? 'checkFailed' : 'checked', fileName }),
      2500,
    )
    return () => clearTimeout(t)
  }, [stage, setStage])

  // Обновление данных: прогресс. Имя файла с «fail» — обновление завершается ошибкой.
  useEffect(() => {
    if (stage.kind !== 'updating') return
    const { fileName, percent } = stage
    const t = setTimeout(() => {
      if (percent >= 100) {
        if (fileName.toLowerCase().includes('fail')) setStage({ kind: 'updateFailed', fileName })
        else {
          setStage({ kind: 'done' })
          onCompleted()
        }
      } else setStage({ kind: 'updating', fileName, percent: Math.min(100, percent + 12) })
    }, 350)
    return () => clearTimeout(t)
  }, [stage, setStage, onCompleted])

  const download = () => {
    downloadCsv(`ключевые_атрибуты_задача_${TASK.number}.csv`, [
      ['ID предмета залога', 'Тип', 'Описание', 'Залогодатель'],
      ...ITEMS_BEFORE.map((x) => [x.id, x.type, x.description, x.pledgor]),
    ])
    onStarted()
  }

  const dragger = (
    <Upload.Dragger
      accept=".xlsx,.xls,.csv"
      multiple={false}
      showUploadList={false}
      beforeUpload={(file) => {
        if (file.size > MAX_SIZE_MB * 1024 * 1024) return Upload.LIST_IGNORE
        onStarted()
        setStage({ kind: 'checking', fileName: file.name })
        return false
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Перетащите файл сюда или нажмите, чтобы выбрать</p>
      <p className="ant-upload-hint">Форматы: XLSX, CSV. Размер до {MAX_SIZE_MB} МБ</p>
    </Upload.Dragger>
  )

  const reupload = (label = 'Загрузить другой файл') => (
    <Button icon={<ReloadOutlined />} onClick={() => setStage({ kind: 'idle' })}>
      {label}
    </Button>
  )

  let body
  switch (stage.kind) {
    case 'idle':
      body = (
        <Flex vertical gap={token.marginLG}>
          <Flex vertical gap={token.marginXS} align="flex-start">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Файл с актуальными данными
            </Typography.Title>
            <Typography.Text type="secondary">
              Скачайте файл, внесите правки в значения атрибутов и загрузите его обратно.
            </Typography.Text>
            <Button icon={<DownloadOutlined />} onClick={download} disabled={cancelled}>
              Скачать файл
            </Button>
          </Flex>
          <Flex vertical gap={token.marginXS}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Файл с обновлениями
            </Typography.Title>
            {cancelled ? (
              <Alert type="info" showIcon title="Задача отменена — загрузка файла недоступна" />
            ) : (
              dragger
            )}
          </Flex>
        </Flex>
      )
      break
    case 'checking':
      body = (
        <Flex vertical align="center" gap={token.marginMD} style={{ padding: token.paddingXL }}>
          <Spin size="large" />
          <Typography.Text strong>Проверяем файл «{stage.fileName}»</Typography.Text>
          <Typography.Text type="secondary">Проверка содержимого и формата</Typography.Text>
        </Flex>
      )
      break
    case 'checkFailed':
      body = (
        <Flex vertical gap={token.marginMD}>
          <Alert
            type="error"
            showIcon
            title={`Файл «${stage.fileName}» не прошёл проверку`}
            description={`Найдено ошибок: ${CHECK_ERRORS.length}. Исправьте файл и загрузите его снова.`}
          />
          <Table size="small" bordered pagination={false} columns={errorColumns} dataSource={CHECK_ERRORS} />
          <Flex gap={token.marginXS}>
            <Button icon={<DownloadOutlined />} onClick={() => downloadReport(CHECK_ERRORS)}>
              Скачать отчёт об ошибках
            </Button>
            {reupload()}
          </Flex>
        </Flex>
      )
      break
    case 'checked':
      body = (
        <Flex vertical gap={token.marginMD} align="flex-start">
          <Alert
            style={{ width: '100%' }}
            type="success"
            showIcon
            title={`Файл «${stage.fileName}» прошёл проверку`}
            description="Содержимое и формат корректны. Можно обновлять данные."
          />
          <Flex gap={token.marginXS}>
            <Button
              type="primary"
              disabled={cancelled}
              onClick={() => setStage({ kind: 'updating', fileName: stage.fileName, percent: 0 })}
            >
              Обновить данные
            </Button>
            {reupload()}
          </Flex>
        </Flex>
      )
      break
    case 'updating':
      body = (
        <Flex vertical align="center" gap={token.marginMD} style={{ padding: token.paddingXL }}>
          <Typography.Text strong>Обновляем данные по файлу «{stage.fileName}»</Typography.Text>
          <Progress percent={stage.percent} style={{ maxWidth: 480 }} />
        </Flex>
      )
      break
    case 'updateFailed':
      body = (
        <Result
          status="error"
          title="Не удалось обновить данные"
          subTitle={`Обновление по файлу «${stage.fileName}» прервано, данные не изменены. Ошибок: ${UPDATE_ERRORS.length}.`}
          extra={[
            <Button key="r" icon={<DownloadOutlined />} onClick={() => downloadReport(UPDATE_ERRORS)}>
              Скачать отчёт об ошибках
            </Button>,
            <Button key="u" type="primary" onClick={() => setStage({ kind: 'checked', fileName: stage.fileName })}>
              Повторить обновление
            </Button>,
          ]}
        />
      )
      break
    case 'done': {
      const rows: SummaryRow[] = buildSummary()
      const sum = (k: keyof Omit<SummaryRow, 'type'>) => rows.reduce((a, r) => a + r[k], 0)
      body = (
        <Flex vertical gap={token.marginMD}>
          <Alert type="success" showIcon title="Данные обновлены" description="Результат обновления по типам предметов залога." />
          <Table
            size="middle"
            bordered
            pagination={false}
            rowKey="type"
            columns={summaryColumns}
            dataSource={rows}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <Typography.Text strong>Итого</Typography.Text>
                </Table.Summary.Cell>
                {(['total', 'updated', 'notUpdated'] as const).map((k, i) => (
                  <Table.Summary.Cell key={k} index={i + 1} align="right">
                    <Typography.Text strong>{sum(k)}</Typography.Text>
                  </Table.Summary.Cell>
                ))}
              </Table.Summary.Row>
            )}
          />
        </Flex>
      )
    }
  }

  return (
    <Flex style={{ minHeight: 'calc(100vh - 170px)' }}>
      <aside
        style={{
          flex: '0 0 360px',
          padding: token.paddingLG,
          borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
          background: token.colorBgContainer,
        }}
      >
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          Общая информация
        </Typography.Title>
        <Descriptions
          column={1}
          layout="vertical"
          size="small"
          items={[
            { key: 'd', label: 'Описание задачи', children: TASK.description },
            { key: 'i', label: 'Инициатор', children: TASK.initiator },
            { key: 'dep', label: 'Подразделение', children: TASK.department },
            { key: 'dl', label: 'Срок исполнения', children: TASK.deadline },
            { key: 'c', label: 'Количество предметов залога', children: ITEMS_BEFORE.length },
            { key: 'cr', label: 'Создана', children: TASK.createdAt },
          ]}
        />
      </aside>
      <div style={{ flex: 1, minWidth: 0, padding: token.paddingLG }}>{body}</div>
    </Flex>
  )
}
