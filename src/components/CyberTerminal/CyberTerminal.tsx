import React, { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, ChevronDown, ChevronUp } from 'lucide-react'
import './CyberTerminal.scss'

interface HistoryItem {
  type: 'command' | 'output' | 'system'
  text: string
}

const CyberTerminal: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'system', text: '系统就绪。输入 "help" 查看命令。' },
  ])
  const contentRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const cmd = input.trim().toLowerCase()
    const newHistory: HistoryItem[] = [...history, { type: 'command', text: input }]

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: '可用命令: \n- help: 显示此帮助信息\n- clear: 清空终端\n- whoami: 显示身份信息\n- status: 系统状态检查\n- matrix: 覆盖系统',
        })
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: '用户: 访客_招聘人员\n权限等级: 1\n状态: 监控中...',
        })
        break
      case 'status':
        newHistory.push({
          type: 'output',
          text: '核心: 最佳\n网络: 已加密\n安全: 运行中',
        })
        break
      case 'matrix':
        newHistory.push({
          type: 'output',
          text: '正在初始化系统覆盖... \n[####################] 100%\n访问已授权。',
        })
        break
      default:
        newHistory.push({ type: 'system', text: `未找到命令: ${cmd}` })
    }

    setHistory(newHistory)
    setInput('')
  }

  return (
    <div className={`cyber-terminal ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="terminal-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="title">
          <TerminalIcon size={14} style={{ marginRight: '8px' }} />
          系统控制台_V1.0.4
        </div>
        <div className="controls">
          {isCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>

      {!isCollapsed && (
        <>
          <div className="terminal-content" ref={contentRef}>
            {history.map((item, i) => (
              <div key={i} className={`output-line ${item.type}`}>
                {item.text}
              </div>
            ))}
          </div>
          <form className="terminal-input-wrapper" onSubmit={handleCommand}>
            <span>{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              spellCheck={false}
            />
          </form>
        </>
      )}
    </div>
  )
}

export default CyberTerminal
