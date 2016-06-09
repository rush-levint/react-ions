import React from 'react'
import { Link } from 'react-router'
import Icon from '../Icon'
import style from './style.scss'

const Node = (props) => {
  let childnodes = null
  let iconParent = props.node.icon ? props.node.icon : null
  let link

  if (props.children) {
    childnodes = props.children.map((childnode, index) =>
      <Node node={childnode} children={childnode.nav} key={index} />
    )
  }

  const handleClick = function(e) {
    e.preventDefault()
    props.node.route()
  }

  if (typeof props.node.route === 'string') {
    link = <a href={props.node.route} target={!props.node.self ? "_blank" : null}>
      {iconParent ? <Icon name={iconParent} fill='currentColor' /> : null}
      {props.node.name}
    </a>
  } else if (typeof props.node.route === 'function') {
    link = <a onClick={handleClick}>
      {iconParent ? <Icon name={iconParent} fill='currentColor' /> : null}
      {props.node.name}
    </a>
  }

  return (
    <li>
    { props.node.external && typeof props.node.route === 'string' || typeof props.node.route === 'function'
      ?
      <div>
        {link}
        { childnodes ?
          <ul className={iconParent ? style.indent : null}>{childnodes}</ul>
        : null }
      </div>
      :
      <div>
        <Link to={props.node.route} activeClassName={style.active}>
          {iconParent ? <Icon name={iconParent} fill='currentColor' /> : null}
          {props.node.name}
        </Link>
        { childnodes ?
          <ul className={iconParent ? style.indent : null}>{childnodes}</ul>
        : null }
      </div>
      }
    </li>
  )
}

export default Node
