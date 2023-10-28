import React from 'react';
import style from './state.module.css';
import { Icon } from '@iconify/react';

export function ErrorState({
  error,
  icon,
  description,
}: {
  error: string;
  icon: any;
  description: string;
}) {
  return (
    <div className={style.end__container}>
      <Icon
        icon={icon}
        height={48}
        width={48}
        color="var(--destructive-color)"
      />
      <div className={style.end__text_wrapper}>
        <h2>Oops! {error}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export function InfoState({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: any;
}) {
  return (
    <div className={style.end__container}>
      <Icon icon={icon} height={48} width={48} color="var(--primary-color)" />
      <div className={style.end__text_wrapper}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
