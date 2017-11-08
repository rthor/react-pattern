const React = require('react')
const PropTypes = require('prop-types')

const Case = ({ children }) =>
  typeof children === 'function' ? children() : children

Case.prototype = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  default: PropTypes.bool,
  when: PropTypes.any,
}

module.exports = Case
