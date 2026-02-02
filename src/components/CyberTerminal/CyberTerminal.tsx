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
    { type: 'system', text: 'SYSTEM READY. TYPE "help" FOR COMMANDS.' },
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
          text: 'AVAILABLE COMMANDS: \n- help: SHOW THIS MESSAGE\n- clear: CLEAR TERMINAL\n- whoami: DISPLAY IDENTITY\n- status: SYSTEM CHECK\n- matrix: OVERRIDE SYSTEM',
        })
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: 'USER: GUEST_RECRUITER\nACCESS_LEVEL: 1\nSTATUS: MONITORING...',
        })
        break
      case 'status':
        newHistory.push({
          type: 'output',
          text: 'CORE: OPTIMAL\nNETWORK: ENCRYPTED\nSECURITY: ACTIVE',
        })
        break
      case 'matrix':
        newHistory.push({
          type: 'output',
          text: 'INITIATING SYSTEM OVERRIDE... \n[####################] 100%\nACCESS GRANTED.',
        })
        break
      default:
        newHistory.push({ type: 'system', text: `COMMAND NOT FOUND: ${cmd}` })
    }

    setHistory(newHistory)
    setInput('')
  }

  return (
    <div className={`cyber-terminal ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="terminal-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="title">
          <TerminalIcon size={14} style={{ marginRight: '8px' }} />
          SYSTEM_CONSOLE_V1.0.4
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
