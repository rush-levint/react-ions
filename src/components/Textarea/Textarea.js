import React from 'react'
import classNames from 'classnames/bind'
import style from './style.scss'

/**
 * The Textarea component.
 */
class Textarea extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: this.props.value
  }

  static defaultProps = {
    disabled: false
  }

  static propTypes = {
    /**
     * Whether the texrtarea is disabled.
     */
    disabled: React.PropTypes.bool,
    /**
     * Text shown above the textarea element.
     */
    label: React.PropTypes.string,
    /**
     * Value of the textarea.
     */
    value: React.PropTypes.string,
    /**
     * Optional styles to add to the textarea component.
     */
    optClass: React.PropTypes.string,
    /**
     * A callback function (from RadioGroup) to be called when the option is selected.
     */
    selectCallback: React.PropTypes.func
  };

  componentDidMount() {
    this.refs.textarea.disabled = this.props.disabled || false;
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
    console.log(this.state);
  }

  render() {
    const cx = classNames.bind(style);
    var disabledClass = this.props.disabled ? style['textarea-disabled'] : '';
    var textareaClass = cx(style['textarea-component'], this.props.optClass, disabledClass);

    return (
      <div className={textareaClass}>
        { this.props.label ? <label>{this.props.label}</label> : null }
        <textarea ref="textarea" name={this.props.name} value={this.state.value} onChange={this.handleChange.bind(this)}></textarea>
      </div>
    )
  }
}

export default Textarea
