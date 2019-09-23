/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import Events from './events';

export interface IProps {
  onClickOutside: (event: React.SyntheticEvent) => void;
  disabled?: boolean;
}

export default class ClickOutside extends React.Component<IProps> {
  static propTypes = {
    onClickOutside: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

  private isTouch: boolean;
  private container: HTMLElement;

  constructor (props) {
    super(props);

    this.isTouch = false;
  }

  componentDidMount () {
    if (!this.props.disabled) {
      Events.on(document, 'click', this.handle);
      Events.on(document, 'touchend', this.handle);
    }
  }

  componentWillUnmount () {
    if (!this.props.disabled) {
      Events.off(document, 'click', this.handle);
      Events.off(document, 'touchend', this.handle);
    }
  }

  getContainer = (node) => {
    this.container = node;
  }

  handle = event => {
    if (event.type === 'touchend') {
      this.isTouch = true;
    }

    if (event.type === 'click' && this.isTouch) return;

    const { onClickOutside } = this.props;
    const el = this.container;

    if (el && !el.contains(event.target)) onClickOutside(event);
  }

  render () {
    const { onClickOutside, disabled, children, ...rest } = this.props;

    return <div ref={this.getContainer} {...rest}>{children}</div>;
  }
}
