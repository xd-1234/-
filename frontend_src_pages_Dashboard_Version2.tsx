import React from 'react'
import { Card, Row, Col, Statistic } from 'antd'

export default function Dashboard() {
  // 占位静态数据
  return (
    <Row gutter={[16,16]}>
      <Col span={6}><Card><Statistic title="B 班本周借阅" value={23} /></Card></Col>
      <Col span={6}><Card><Statistic title="重复率(滚动8周)" value="2.5%" /></Card></Col>
      <Col span={6}><Card><Statistic title="保障池利用率" value="72%" /></Card></Col>
      <Col span={6}><Card><Statistic title="冷门书激活数" value={5} /></Card></Col>
      <Col span={24}>
        <Card title="后续可加入图表 (ECharts)">
          图表占位：类别分布 / 借阅趋势
        </Card>
      </Col>
    </Row>
  )
}