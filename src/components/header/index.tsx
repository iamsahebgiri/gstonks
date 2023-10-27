"use client";

import React from 'react';
import style from '@/styles/layout.module.css';
import SearchBar from '../search-bar';
import { ThemeToggle } from '../theme-toggle';
import { site } from '@/config';

const { name } = site;

const Header = () => {
  return (
    <header className={style.header}>
      <nav className={`${style.navigation} container`}>
        <h1 className={style.logo}>{name}</h1>
        <SearchBar />
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
