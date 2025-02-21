import React, { Component } from 'react';
import ActivityIndicator from 'zarm/lib/activity-indicator';
import classnames from 'classnames';
import PropsType from './PropsType';

export interface SwitchState {
  checked?: boolean;
}

class Switch extends Component<PropsType, SwitchState> {
  static displayName = 'Switch';

  static defaultProps = {
    prefixCls: 'zw-switch',
    loading: false,
    size: 'md',
    defaultChecked: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (('checked' in nextProps) && nextProps.checked !== prevState.checked) {
      return {
        checked: nextProps.checked,
      };
    }
    return null;
  }

  _onClick() {
    const { onChange } = this.props;
    const { checked } = this.state;
    if (!('onChange' in this.props) && !('checked' in this.props)) {
      this.setState({
        checked: !checked,
      });
    } else {
      onChange && onChange(!checked);
    }
  }

  render() {
    const {
      size, disabled, className, prefixCls, loading, style,
    } = this.props;
    const { checked } = this.state;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--checked`]: checked,
      [`${prefixCls}--disabled`]: disabled || loading,
      [`${prefixCls}--${'sm'}`]: size === 'sm',
    });

    return (
      <span
        className={cls}
        style={{ ...style }}
        onClick={() => !disabled && !loading && this._onClick()}
      >
        <span className={`${prefixCls}__inner`}>
          {loading ? (
            <span className={`${prefixCls}__loading`}>
              <ActivityIndicator prefixCls="zw-activity-indicator" />
            </span>
          ) : <span />}
        </span>
      </span>
    );
  }
}

export default Switch;
