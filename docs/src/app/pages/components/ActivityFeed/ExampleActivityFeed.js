import React from 'react'
import ActivityFeed from 'react-conventions/lib/ActivityFeed'
import Button from 'react-conventions/lib/Button'
import style from './style.scss'

const styles = ['success', 'info', 'danger', 'warning']
const actions = ['activity', 'share', 'commission', 'event']

const config = {
  APP_URL: 'http://getambassador.com'
}

class ExampleActivityFeed extends React.Component {
  constructor(props) {
    super(props)
  }

  genActivities = (numToAdd, incrementor) => {
    let items = []
    for (var i = 0; i < numToAdd; i++) {
      items.push({
        name: 'New ' + actions[Math.floor(Math.random() * 4)] + ' ' + incrementor,
        profileUrl: '/components/button',
        title: 'just happened.',
        text: 'This is just to test whether the component updates correctly.',
        timestamp: (new Date()).toISOString(),
        badge: {
          text: incrementor.toString(),
          theme: styles[Math.floor(Math.random() * 4)]
        }
      })
      incrementor++
    }
    return items
  }

  getInitialActivities = () => {
    let items = [
      {
        title: 'Earned a commission of $10.00',
        timestamp: '2016-05-06T18:19:08.936',
        badge: {
          text: '9',
          theme: 'success'
        }
      }, {
        title: 'Shared via Facebook',
        text: 'I really love the way they implmemented this.',
        timestamp: '2016-05-05T18:19:08.936',
        actions: [
          {
            type: 'approve',
            icon: 'icon-hand-like-1-1',
            tooltip: 'Approve',
          }, {
            type: 'deny',
            icon: 'icon-hand-unlike-1',
            callbackConfirmation: true,
            callback: (type) => {
              alert(type)
            },
            tooltip: 'Deny'
          }, {
            type: 'info',
            icon: 'icon-information-1',
            tooltip: 'This is info'
          }
        ],
        badge: {
          text: '7',
          theme: 'warning'
        }
      }, {
        name: 'Linkable name',
        profileUrl: '/foundations/iconography',
        profileUrlTarget: '_blank',
        timestamp: '2016-06-15T18:19:08.936',
        actions: [
          {
            type: 'reply',
            icon: 'icon-back',
            callback: (type) => {
              alert(type)
            },
            callbackConfirmation: true
          }, {
            type: 'flag',
            icon: 'icon-flag-1-1',
            callback: (type) => {
              console.log(type)
            },
            callbackConfirmation: false,
            tooltip: 'Flag this item'
          }
        ],
        badge: {
          text: '3',
          theme: 'danger'
        }
      }, {
        name: 'Printed test page.',
        timestamp: '2016-06-15T18:19:08.936',
        badge: {
          icon: 'icon-mail-inbox-1',
          theme: 'fog'
        }
      }
    ]

    return [...items, ...this.genActivities(16, 5)]
  }

  state = {
    count: 21,
    activities: this.getInitialActivities(),
    useWindowAsScrollContainer: true
  }

  changeActivities = () => {
    this.setState({
      count: 21,
      activities: this.genActivities(21, 1)
    })
  }

  toggleContainer = () => {
    const useWindowAsScrollContainer = !this.state.useWindowAsScrollContainer
    this.setState({
      useWindowAsScrollContainer: useWindowAsScrollContainer
    })
  }

  handleInfiniteLoad = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(this.state.count > 400) {
          reject()
        } else {
          this.setState({
            count: this.state.count+100,
            activities: [...this.state.activities, ...this.genActivities(100, this.state.count)]
          }, () => resolve())
        }
      }, 1500)
    })
  }

  render() {
    return(
      <div>
        <p>
          <Button onClick={this.changeActivities}>Set random activities</Button>
          <Button onClick={this.toggleContainer}>{ this.state.useWindowAsScrollContainer ? 'Use element as scroll container' : 'Use window as scroll container'}</Button>
        </p>
        <div className={style['test-div']} />
        <ActivityFeed
          data={this.state.activities}
          totalCount={420}
          useWindowAsScrollContainer={this.state.useWindowAsScrollContainer}
          containerHeight={400}
          onInfiniteLoad={this.handleInfiniteLoad} />
      </div>
    )
  }
}

export default ExampleActivityFeed
