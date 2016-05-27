import React from 'react'
import Input from '../Input/Input'
import { SketchPicker } from 'react-color'
import style from './style.scss'


/**
 * The ColorPicker component.
 */
class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    displayColorPicker: false,
    color: ''
  }

  static propTypes = {
    /**
     * Hex color value.
     */
    color: React.PropTypes.bool,
    /**
     * A callback function to be called when the checkbox changes.
     */
    changeCallback: React.PropTypes.func
  }

  componentWillMount = () => {
    if (typeof this.props.color !== 'undefined') {
      this.setState({color: this.props.color})
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  handlePickerChange = (color) => {
    let newColor = color.hex
    this.setState({ color: newColor }, function() {
      if (typeof this.props.changeCallback === 'function') {
        this.props.changeCallback(newColor);
      }
    })
  }

  handleInputChange = (event) => {
    let newColor = ''

    if (event.target.value && !event.target.value.startsWith('#')) {
      newColor = '#'
    }

    newColor += event.target.value

    this.setState({ color: newColor }, function() {
      if (typeof this.props.changeCallback === 'function') {
        this.props.changeCallback(newColor);
      }
    })
  }

  render() {
    return (
      <div className={style['colorpicker-component']}>
        <Input
          value={this.state.color}
          placeholder='Click to choose a color'
          onClick={this.handleClick}
          changeCallback={this.handleInputChange}
        />
        <div
          className={style['color-preview']}
          style={{backgroundColor: this.state.color}}
          onClick={this.handleClick}>
        </div>
        { this.state.displayColorPicker ?
          <div className={style['sketch-container']} >
            <div onClick={this.handleClose} />
            <SketchPicker color={ this.state.color } onChange={this.handlePickerChange} />
          </div>
          : null
        }
      </div>
    )
  }
}

export default ColorPicker