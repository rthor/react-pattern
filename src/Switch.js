const React = require('react')
const PropTypes = require('prop-types')

const defaultCase = child => child.props.default

const Switch = props => {
  const children = React.Children.toArray(props.children)
  const result = children.find(child => {
    if (typeof child.props.when === 'function') {
      return child.props.when(props.value)
    }
    return child.props.when === props.value
  })

  if (!result) {
    const defaultCaseResult = children.find(defaultCase)
    return defaultCaseResult ? defaultCaseResult : null
  }

  return result
}

Switch.prototype = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any,
}

module.exports = Switch
