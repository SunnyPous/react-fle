import React, {Component, PropTypes} from 'react';
import cleanProps from '../cleanProps';
import style from 'flexboxgrid';

const ModificatorType = PropTypes.oneOfType([PropTypes.number, PropTypes.bool]);

const propTypes = {
  xs: ModificatorType,
  sm: ModificatorType,
  md: ModificatorType,
  lg: ModificatorType,
  xsOffset: PropTypes.number,
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,
  reverse: PropTypes.bool,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.node
};

const propKeys = Object.keys(propTypes);

export default class Col extends Component {

  constructor(props) {
    super(props);

    this._classMap = {
      xs: 'col-xs',
      sm: 'col-sm',
      md: 'col-md',
      lg: 'col-lg',
      xsOffset: 'col-xs-offset',
      smOffset: 'col-sm-offset',
      mdOffset: 'col-md-offset',
      lgOffset: 'col-lg-offset'
    };
  }

  render() {
    const classes = [];

    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.props.reverse) {
      classes.push(style.reverse);
    }

    for (const key in this.props) {
      if (this.props.hasOwnProperty(key) && this._classMap[key]) {
        let colBaseClass = this._classMap[key];
        colBaseClass = Number.isInteger(this.props[key]) ? (colBaseClass + '-' + this.props[key]) : colBaseClass;
        classes.push(style[colBaseClass]);
      }
    }

    const className = classes.join(' ');

    const newProps = Object.assign({}, cleanProps(propKeys, this.props), { className });

    return React.createElement(this.props.tagName || 'div', newProps, this.props.children);
  }
}

Col.propTypes = propTypes;
