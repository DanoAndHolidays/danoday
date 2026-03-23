import 'dotenv/config'
// import { agentFromComputer } from '@midscene/computer';
import { ComputerDevice, agentFromComputer } from '@midscene/computer'

// 列出所有显示器
const displays = await ComputerDevice.listDisplays()
console.log('可用显示器:', displays)

;(async () => {
  // 创建 agent 连接到特定显示器
  const agent = await agentFromComputer({
    displayId: displays[0].id,
    aiActionContext: '你正在控制一台桌面计算机。',
  })

  // 截图并查询信息
  const screenInfo = await agent.aiQuery('{width: number, height: number}, 获取屏幕分辨率')
  console.log('屏幕分辨率:', screenInfo)

  // 移动鼠标到中心
  await agent.aiAct('将鼠标移动到屏幕中心')

  // 断言屏幕有内容
  await agent.aiAssert('屏幕有可见内容')

  console.log('桌面自动化完成！')
})()
