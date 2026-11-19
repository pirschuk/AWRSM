import { Table, Typography, theme } from 'antd'
import type { TableColumnsType } from 'antd'
import { PLEDGOR_NAMES, TYPE_NAMES, type PledgeItem } from './data'

const byText = (key: keyof PledgeItem) => (a: PledgeItem, b: PledgeItem) => a[key].localeCompare(b[key], 'ru')

export default function PledgeItemsTab({ items }: { items: PledgeItem[] }) {
  const { token } = theme.useToken()

  const columns: TableColumnsType<PledgeItem> = [
    { title: 'ID', dataIndex: 'id', width: 140, sorter: byText('id') },
    {
      title: 'Тип предмета залога',
      dataIndex: 'type',
      width: 240,
      sorter: byText('type'),
      filters: TYPE_NAMES.map((t) => ({ text: t, value: t })),
      onFilter: (v, r) => r.type === v,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      sorter: byText('description'),
      ellipsis: { showTitle: false },
      render: (v: string) => (
        <Typography.Text ellipsis={{ tooltip: v }} style={{ display: 'block' }}>
          {v}
        </Typography.Text>
      ),
    },
    {
      title: 'Залогодатель',
      dataIndex: 'pledgor',
      width: 320,
      sorter: byText('pledgor'),
      filters: PLEDGOR_NAMES.map((p) => ({ text: p, value: p })),
      filterSearch: true,
      onFilter: (v, r) => r.pledgor === v,
      ellipsis: { showTitle: false },
      render: (v: string) => (
        <Typography.Text ellipsis={{ tooltip: v }} style={{ display: 'block' }}>
          {v}
        </Typography.Text>
      ),
    },
  ]

  return (
    <div style={{ padding: token.paddingLG }}>
      <Table<PledgeItem>
        rowKey="id"
        size="middle"
        columns={columns}
        dataSource={items}
        sticky
        pagination={{ pageSize: 20, showSizeChanger: false, showTotal: (t) => `Всего: ${t}` }}
      />
    </div>
  )
}
