'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Icon } from '@iconify/react';
import weatherSunny24Regular from '@iconify/icons-fluent/weather-sunny-24-regular';
import weatherMoon24Regular from '@iconify/icons-fluent/weather-moon-24-regular';
import style from './theme-toggle.module.css';
import Tooltip from '../tooltip';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div>
        <Icon
          icon={weatherSunny24Regular}
          color="var(--icon-color)"
          height={24}
          width={24}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
      className={style.toggle__button}
    >
      <Icon
        icon={theme === 'dark' ? weatherSunny24Regular : weatherMoon24Regular}
        color="var(--icon-color)"
        height={24}
        width={24}
      />
    </button>
  );
}
