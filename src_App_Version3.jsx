import { useState } from 'react'

export default function App() {
  const [msg] = useState('前端空壳运行成功。下一步：添加真实的学生/图书/方案逻辑或接后端。')
  return (
    <div style={{ maxWidth: 840, margin: '0 auto', padding: 24 }}>
      <h1>智能书柜借阅管理系统（前端空壳）</h1>
      <p>{msg}</p>
      <h2>下一步建议</h2>
      <ol>
        <li>确认本页面能打开（说明 React + Vite 正常）</li>
        <li>创建 server/ 目录并添加后端（后面我给你的代码再贴进去）</li>
        <li>替换此页面为真实的借阅界面（或直接复制你之前的 App.jsx 内容）</li>
      </ol>
    </div>
  )
}