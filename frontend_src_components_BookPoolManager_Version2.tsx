import React from 'react'
import { Card, Table, Tag, Button } from 'antd'
import { listBooks } from '../api/endpoints'

export default function BookPoolManager() {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<any[]>([])

  const load = async () => {
    setLoading(true)
    try {
      const books = await listBooks()
      setData(books)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => { load() }, [])

  return (
    <Card title="B 班保障池（示例：展示所有书，后续可过滤 reserved_flag = B）"
      extra={<Button onClick={load}>刷新</Button>}>
      <Table
        size="small"
        rowKey="id"
        loading={loading}
        dataSource={data}
        columns={[
          {title:'ID', dataIndex:'id', width:60},
          {title:'书名', dataIndex:'title'},
          {title:'类别', dataIndex:'category'},
          {title:'状态', dataIndex:'status', render:(v:any)=> <Tag color={v==='available'?'green':'red'}>{v}</Tag>},
          {title:'保留', dataIndex:'reserved_flag', render:(v:any)=> v ? <Tag color="blue">{v}</Tag> : '-'},
          {title:'热度', dataIndex:'popularity', width:80}
        ]}
      />
    </Card>
  )
}