import type { ComponentProps } from 'react';
import style from './tooltip.module.css';

interface TooltipProps extends ComponentProps<'div'> {
  title: string;
}

const Tooltip = ({ children, title }: TooltipProps) => {
  return (
    <div className={style.tooltip}>
      {children}
      <span className={style.tooltipText}>{title}</span>
    </div>
  );
};

export default Tooltip;
