import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import optclass from '../internal/OptClass'
import Button from './Button'
import style from './style.scss'

export class ButtonConfirmation extends Component {
  constructor(props) {
    super(props)
    this.mql = window.matchMedia('(max-width: 992px)')
  }

  static defaultProps = {
    prompt: 'Are you sure?'
  }

  static propTypes = {
    /**
     * Optional styles to add to the button.
     */
     optClass: PropTypes.oneOfType([
       PropTypes.array,
       PropTypes.string
     ]),
    /**
     * The size of button.
     */
    size: PropTypes.string,
    /**
     * Whether the button is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Whether to display only an icon on small screens
     */
    collapse: PropTypes.bool,
    /**
     * Position of the button on the page for overlay carrot orientation when the screen size is tablet sized or smaller
     */
    position: PropTypes.oneOf(['left', 'right']),
    /**
     * Text that will appear in the overlay prompt.
     */
    prompt: PropTypes.string,
    /**
     * Function used to pass up the confirmation to the parent component
     */
    handleConfirmation: PropTypes.func
  }

  state = {
    confirmationOverlayOpen: false,
    confirmationOverlayOffset: 0,
    wide: false
  }

  handleOpen = () => {
    this.setState({ confirmationOverlayOpen: !this.state.confirmationOverlayOpen })
  }

  handleConfirmation = (confirm) => {
    this.setState({ confirmationOverlayOpen: false  }, () => {
      if (typeof this.props.handleConfirmation === 'function' && confirm) {
        this.props.handleConfirmation(confirm)
      }
    })
  }

  handleSetup = () => {
    const triggerRect = this._trigger.children[0].getBoundingClientRect()
    const overlayRect = this._trigger.querySelector("[class*='confirmation-overlay']").getBoundingClientRect()

    this.setState({
      triggerWidth: triggerRect.width,
      overlayWidth: overlayRect.width
    })
  }

  handleWide = () => {
    if (this.props.prompt.length > 25) {
      this.setState({ wide: true }, () => {
        this.handleSetup()
      })
    }
  }

  getStyles = () => {
    if (this.props.position === 'right') {
      return {
        right: `${this.state.confirmationOverlayOffset}px`
      }
    }
    if (this.props.position === 'left') {
      return {
        left: `${this.state.confirmationOverlayOffset}px`
      }
    }

    // https://developers.google.com/web/updates/2016/06/absolute-positioned-children
    // Once ^ is supported in Safari and Firefox we can remove this and allow flex box to do it's thing
    if (this.props.collapse) {
      return {
        left: `-${((this.state.overlayWidth - this.state.triggerWidth) / 2 + 2)}px`
      }
    }
    return {
      left: `-${((this.state.overlayWidth - this.state.triggerWidth) / 2)}px`
    }
  }

  getCaretStyles = () => {
    if (this.props.position === 'right') {
      return { right: `calc(${(this.state.triggerWidth / 2) - 5}px)`}
    }
    if (this.props.position === 'left') {
      return { left: `calc(0% + ${(this.state.triggerWidth / 2) - 5}px)` }
    }
    if (!this.props.position && this.state.wide) {
      return { left: `calc(0% + 96px)` }
    } else if (!this.props.position && !this.state.wide){
      return { left: `calc(0% + 66px)` }
    }
  }

  /**
   * To trigger JavaScript changes on a breakpoint
   * @param  {Object} mediaQueryList
   * @return {Boolean} whether the viewport is < or > than max-width 768px
   */
  handleMediaChange = () => {
    this.handleSetup()
  }

  componentDidMount = () => {
    this.mql.addListener(this.handleMediaChange)
    this.handleWide()
  }

  componentWillUnmount = () => {
    this.mql.removeListener(this.handleMediaChange)
  }

  render = () => {
    const cx = classNames.bind(style)
    const { collapse, handleConfirmation, ...other } = this.props

    const buttonClass = optclass(style, ['confirmation-approve-btn'])
    const overlayPositionClass = this.props.position ? style[this.props.position] : null
    const overlayVisibleClass = this.state.confirmationOverlayOpen ? style['visible'] : null
    const overlayWideClass = this.state.wide ? style['wide'] : null
    const confirmationOverlayClasses = cx(overlayVisibleClass, overlayPositionClass, overlayWideClass, style['confirmation-overlay'])

    return (
      <div ref={(trigger) => this._trigger = trigger} className={style['confirmation-wrapper']}>
        <Button {...other} collapse={collapse} disabled={this.state.confirmationOverlayOpen} onClick={this.handleOpen}>
          { this.props.children }
        </Button>
        <div className={confirmationOverlayClasses} style={this.getStyles()}>
          <em style={this.getCaretStyles()}></em>
          <span className={style['confirmation-text']}>{this.props.prompt}</span>
          <div className={style['button-wrapper']}>
            <Button onClick={this.handleConfirmation.bind(this, false)} optClass='danger-alt'>Cancel</Button>
            <Button onClick={this.handleConfirmation.bind(this, true)} optClass={buttonClass} >Yes</Button>
          </div>
        </div>
      </div>
    )
  }
}


export default ButtonConfirmation
