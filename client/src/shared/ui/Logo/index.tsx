import cl from 'classnames';
import React from 'react';

import styles from './index.module.scss';
import { Space } from 'antd';
import Link from 'next/link';

type Props = {
  className?: string;
  descriptor?: string;
  icon?: boolean;
};

const Logo = (props: Props) => {
  const { className, descriptor, icon = false } = props;

  if (icon) {
    return (
      <Link href={'/'} className={styles.logoIcon}>
        <img src="/logo_purp.svg" alt="logo" />
      </Link>
    );
  }

  return (
    <Link href={'/'} className={cl(styles.logo)}>
      <div className={styles.logoName}>
        Cryptohost<span>/</span>
      </div>
      {descriptor && <div className={styles.logoDescriptor}>{descriptor}</div>}
    </Link>
  );
};

export default Logo;
