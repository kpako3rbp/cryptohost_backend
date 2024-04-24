import cl from 'classnames';
import React from 'react';

import styles from './index.module.scss';

type Props = {
  className?: string;
  isGlobal: boolean;
}

const Preloader = (props: Props) => {
  const { className, isGlobal = true } = props;

  const preloaderClassNames = cl(className, {
    [styles.preloaderGlobal]: isGlobal,
    [styles.preloaderStandalone]: !isGlobal,
  });

  return (
    /*<div className={preloaderClassNames}>
      <div className={styles.spinner}></div>
      <span>Идет загрузка</span>
    </div>*/
   <div className={styles.container}>
     <div className={styles.spinner}></div>
   </div>
  );
};

export default Preloader;
