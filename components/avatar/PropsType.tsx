export interface PropsType {
  prefixCls?: string;
  icon?: string;
  shape?: 'circle' | 'square';
  size?: number | 'lg' | 'sm';
  src?: string;
  alt?: string;
  className?: string;
}
export interface StateType {
  loadError: boolean;
}
