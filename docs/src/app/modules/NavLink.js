import React from 'react'
import { Link } from 'react-router'
import style from 'private/css/nav'

class NavLink extends React.Component {
  render() {
    return <Link {...this.props} activeClassName={style.active} />
  }
}

export default NavLink;
