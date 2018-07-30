import React from 'react'
import { Card, Tabs, message, Icon } from 'antd'
import './ui.less'

const TabPane = Tabs.TabPane

export default class MyTabs extends React.Component {
    newTabIndex = 0
    changeTab = (key) => {
        message.info(key)
    }
    componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: 'This is Tab 1',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'This is Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'This is Tab 3',
                key: '3'
            }
        ]

        this.setState({
            panes,
            activeKey: panes[0].key
        })
    }
    handleChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
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
    render() {
        return (
            <div>
                <Card title="Tab标签页" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.changeTab}>
                        <TabPane tab="Tab 1" key="1">React</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>Vue</TabPane>
                        <TabPane tab="Tab 3" key="3">Flask</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.changeTab}>
                        <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">React</TabPane>
                        <TabPane tab={<span><Icon type="edit" />Tab 2</span>} key="2">Vue</TabPane>
                        <TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3">Flask</TabPane>
                    </Tabs>
                </Card>
                <Card title="可编辑的页签" className="card-wrap">
                    <Tabs
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onChange={this.handleChange}
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((pane) => {
                                return <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}