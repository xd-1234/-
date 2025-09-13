import React from 'react'
import { Card, List, Button, message } from 'antd'
import { listUpcomingSessions, generateSession, listRecommendations } from '../api/endpoints'
import type { Session, Recommendation } from '../types'

export default function SessionAllocation() {
  const [sessions, setSessions] = React.useState<Session[]>([])
  const [selected, setSelected] = React.useState<Session | null>(null)
  const [recs, setRecs] = React.useState<Recommendation[]>([])
  const [loading, setLoading] = React.useState(false)

  const loadSessions = async () => {
    const data = await listUpcomingSessions()
    setSessions(data)
    if (!selected && data.length) {
      setSelected(data[0])
    }
  }

  const loadRecs = async (sessId: number) => {
    const r = await listRecommendations(sessId)
    setRecs(r)
  }

  React.useEffect(() => { loadSessions() }, [])
  React.useEffect(() => { if (selected) loadRecs(selected.id) }, [selected])

  const onGenerate = async () => {
    if (!selected) return
    setLoading(true)
    try {
      await generateSession(selected.id)
      await loadRecs(selected.id)
      message.success('已生成分配')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{display:'flex', gap:24}}>
      <Card title="即将场次" style={{width:300}}>
        <List
          dataSource={sessions}
          renderItem={s=>(
            <List.Item
              onClick={()=>setSelected(s)}
              style={{cursor:'pointer', background:selected?.id===s.id?'#f0f5ff':''}}>
              {new Date(s.date).toLocaleString()} | {s.clazz}
            </List.Item>
          )}
        />
      </Card>
      <Card
        title={`场次详情 ${selected ? new Date(selected.date).toLocaleString() : ''}`}
        extra={<Button onClick={onGenerate} loading={loading} disabled={!selected}>生成/刷新推荐</Button>}
        style={{flex:1}}
      >
        <List
          dataSource={recs}
          renderItem={r=>(
            <List.Item>
              学生ID: {r.student_id} | 主推荐书ID: {r.primary_book_id} | 备选: {r.alt_book_ids?.join(',') || '-'}
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}