import React from 'react'
import {Card, Tabs, message, Icon} from 'antd'
import './ui.less'

const TabPane = Tabs.TabPane;

export default class Tab extends React.Component {
 
  newTabIndex = 0
  handleCallBack = (key) => {
    message.info('Hi, 您选择了页签: ' + key)
  }
  componentWillMount () {
    const panes = [
      {
        title: 'Tab1',
        content: 'React',
        key: '1'
      },
      {
        title: 'Tab2',
        content: 'AntD',
        key: '2'
      },
      {
        title: 'Tab3',
        content: 'Redux',
        key: '3'
      }
    ]
    this.setState({
      panes,
      activeKey: panes[0].key
    })
  }
  onChange = (activeKey) => {
    this.setState({
      activeKey
    })
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }
  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  render () {
    return (
      <div>
        <Card title="Tab页标签" className="card">
          <Tabs defaultActiveKey="1" onChange={this.handleCallBack}>
            <TabPane tab="Tab 1" key="1">React</TabPane>
            <TabPane tab="Tab 2" key="2">Ant Design</TabPane>
            <TabPane tab="Tab 3" key="3">Redux</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页标签" className="card">
          <Tabs defaultActiveKey="1" onChange={this.handleCallBack}>
            <TabPane tab={<span><Icon type="plus"></Icon>Tab 1</span>} key="1">React</TabPane>
            <TabPane tab={<span><Icon type="edit"></Icon>Tab 2</span>} key="2">Ant Design</TabPane>
            <TabPane tab={<span><Icon type="delete"></Icon>Tab 3</span>} key="3" disabled>Redux</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab页标签" className="card">
          <Tabs 
            onChange={this.onChange}
            onEdit={this.onEdit}
            activeKey={this.state.activeKey}
            type="editable-card"
            >
            {
              this.state.panes.map((panel) => {
                return <TabPane 
                  tab={panel.title}
                  key={panel.key}
                >
                  {panel.content}
                </TabPane>
              })
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}