import React, { InputHTMLAttributes, ReactNode, Component, MouseEventHandler, KeyboardEventHandler } from 'react';
import classnames from 'classnames';
import Group from '../input-group';
import Input from '../index';
// @ts-ignore
import PropsType, { AddonIF } from '../PropsType';
import Icon from '../../icon';

const Style = {
  group: { alignItems: 'stretch' },
};

type PropsIF = Merge<InputHTMLAttributes<HTMLInputElement>,
  PropsType &
  {
    showIcon?: boolean;           // 是否显示icon
    showButton?: boolean;
    button?: ReactNode;
    onSearch?: KeyboardEventHandler<HTMLInputElement> | MouseEventHandler<HTMLDivElement>;
  }
>;

class Search extends Component<PropsIF> {
  static defaultProps = {
    showIcon: true,
    button: '搜索',
    shape: 'radius',
    showButton: true,
  };

  onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.disabled) return;
    if (this.props.onSearch) {
      if (e.nativeEvent.keyCode === 13) {
        (this.props.onSearch as KeyboardEventHandler<HTMLInputElement>)(e);
      }
    }
  };

  render() {
    const { showIcon, showButton, shape, button, onSearch, disabled, size, ...others } = this.props;
    const cls = classnames({
      'ui-search-btn': true,
      disabled,
      [`shape-${shape}`]: true,
      [`size-${size}`]: !!size,
    });
    const addonIcon: { addonBefore?: AddonIF } = {};
    if (showIcon) {
      addonIcon.addonBefore = {
        fillType: 'transparent',
        addon: <Icon type="search" />,
      };
    }

    if (!showButton) {
      return <Input<'input'> shape={shape} {...others} onKeyPress={this.onKeyPress} {...addonIcon} />;
    }
    return (
      <Group style={Style.group}>
        <Input<'input'> shape={shape} {...others} onKeyPress={this.onKeyPress} {...addonIcon} />
        <div className={cls} onClick={disabled ? undefined : onSearch as MouseEventHandler<HTMLDivElement>}>
          {button}
        </div>
      </Group>
    );
  }
}

export default Search;
