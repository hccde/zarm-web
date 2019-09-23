import React, { Component, ReactEventHandler, HTMLAttributes, CSSProperties } from 'react';
import classnames from 'classnames';
import { PropsType, StateType } from './PropsType';
import Icon from '../icon';

class Avatar extends Component<PropsType & HTMLAttributes<HTMLSpanElement>, StateType> {
  static defaultProps: PropsType = {
    prefixCls: 'za-avatar',
    icon: '',
    shape: 'circle',
    src: '',
    alt: '',
  };

  state: StateType = {
    loadError: false,
  };

  onError: ReactEventHandler<HTMLImageElement> = (e) => {
    this.setState({ loadError: true });
    if (this.props.onError) {
      this.props.onError(e);
    }
  };

  render() {
    const {
      prefixCls,
      style,
      size,
      shape,
      icon,
      src,
      alt,
      children,
      className,
      ...others
    } = this.props;
    const { loadError } = this.state;

    const hasIcon = (icon && icon.trim() !== '');
    const hasImage = (src && src.trim() !== '');
    const hasString = (typeof children === 'string');
    const strLength = (typeof children === 'string' && children.length) || 0;

    const cls = classnames({
      [prefixCls!]: true,
      [className!]: className,
      [`${prefixCls}--${size}`]: typeof size === 'string' && size,
      [`${prefixCls}--${shape}`]: true,
      [`${prefixCls}--icon`]: hasIcon,
      [`${prefixCls}--image`]: hasImage && !loadError,
      [`${prefixCls}--string`]: hasString || (hasImage && loadError),
    });
    const inlineStyle: CSSProperties = (typeof size === 'number') ? {
      ...style,
      width: size,
      height: size,
      lineHeight: `${size}px`,
      fontSize: `${size / 2}px`,
    } : { ...style };

    const spanStyle: CSSProperties = {
      position: 'absolute',
      transform: `scale(${1 - 0.1 * (strLength - 1)})`,
      left: `calc(50% - ${4.5 * strLength}px )`,
    };

    return (
      <span
        style={inlineStyle}
        className={cls}
        {...others}
      >
        {hasImage && !loadError && <img src={src} alt={alt} onError={this.onError} />}
        {!hasImage && hasIcon && <Icon type={icon} />}
        {(!hasImage || (hasImage && loadError)) && !hasIcon && hasString && <span style={spanStyle}>{children}</span>}
      </span>
    );
  }
}

export default Avatar;
