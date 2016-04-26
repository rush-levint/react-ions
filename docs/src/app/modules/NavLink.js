import React from 'react'
import { Link } from 'react-router'
import style from 'private/css/nav'

const NavLink = (props) => {
  return <Link {...this.props} activeClassName={style.active} />
}

export default NavLink;
