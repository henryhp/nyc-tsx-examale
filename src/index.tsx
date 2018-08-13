import React from 'react';
import ReactDOM from 'react-dom';
import { List, Button, WhiteSpace, WingBlank, Tabs, Flex } from 'antd-mobile';
import './index.less';
import FastClick from 'fastclick';

document.addEventListener(
  'DOMContentLoaded',
  function() {
    FastClick.attach(document.body);
  },
  false,
);

const logLevelTabs = [
  { title: 'All' },
  { title: 'Log' },
  { title: 'Info' },
  { title: 'Warn' },
  { title: 'Error' },
];

const tabs = [{ title: 'Log' }, { title: 'nyc test' }];

class DebuggerAssistant extends React.Component<any, any> {
  setState: any;
  listRef: any;
  private state: { data: any[]; type: string; tab: string };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: 'all',
      tab: 'log',
    };
  }

  componentWillMount() {
    document.addEventListener(
      'onTinyDebugConsole',
      this.onTinyDebugConsole,
      false,
    );
  }

  componentDidMount() {
    let clientHeight = document.documentElement.clientHeight;
    if (navigator.userAgent.indexOf('Android') > -1) {
      clientHeight = clientHeight * 0.75;
    }
    const headerHeight = 34;
    const tabHeight = 36;
    const footerHeight = 48;
    const tabsBodyHeght = clientHeight - headerHeight - tabHeight * 2 - footerHeight;
    if (this.listRef) {
      this.listRef.style.height = `${tabsBodyHeght}px`;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('onTinyDebugConsole', this.onTinyDebugConsole);
  }

  onTinyDebugConsole = e => {
    const { data } = this.state;
    data.push(e.data);
    this.setState({
      data,
    });
  }
  onLogTabChange = e => {
    this.setState({
      type: e.title.toLowerCase(),
    });
  }
  onTabChange = e => {
    this.setState({
      tab: e.title.toLowerCase(),
    });
  }

  render() {
    const { data, type, tab } = this.state;
    return (
      <div>
        <List
          renderHeader={() => {
            return '小程序调试助手';
          }}
          className="debugger-title"
        />
        <Tabs
          tabs={tabs}
          animated={false}
          swipeable={false}
          onChange={this.onTabChange}
        >
          <div>
            <Tabs
              tabs={logLevelTabs}
              animated={false}
              swipeable={false}
              onChange={this.onLogTabChange}
            />
            <div
              ref={listContainer => (this.listRef = listContainer)}
              className="debugger-log-list"
            >
              <List>
                {data.map((item, index) => {
                  if (type === 'all' || type === item.type) {
                    return (
                      <List.Item
                        wrap
                        key={`debugger-item-${index}`}
                        className={item.type}
                      >
                        {item.content}
                      </List.Item>
                    );
                  }
                })}
              </List>
            </div>
          </div>
          <div>
            <List>
              <List.Item
                onClick={() => {
                  window.alert('clearStorage4Debug');
                }}
              >
                清除缓存
              </List.Item>
            </List>
          </div>
        </Tabs>
        <WingBlank size="lg" className="debugger-action">
          <WhiteSpace />
          <Flex>
            {tab === 'log' && (
              <Flex.Item>
                <Button
                  size="small"
                  onClick={() => {
                    this.setState({ data: [] });
                  }}
                >
                  清除
                </Button>
              </Flex.Item>
            )}
            <Flex.Item>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  window.alert('toggleDebugPanel');
                }}
              >
                关闭
              </Button>
            </Flex.Item>
          </Flex>
          <WhiteSpace />
        </WingBlank>
      </div>
    );
  }
}

if (/NycClient/.test(navigator.userAgent)) {
  document.addEventListener(
    'NycJSBridgeReady',
    () => {
      ReactDOM.render(
        <DebuggerAssistant />,
        document.getElementById('react-content'),
      );
    },
    false,
  );
} else {
  ReactDOM.render(
    <DebuggerAssistant />,
      document.getElementById('react-content'),
  );
}
