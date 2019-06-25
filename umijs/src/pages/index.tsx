import * as React from 'react';
import { RouterTypes } from 'umi';
import styles from './index.less';

import { Button } from 'antd';

const App: React.SFC<RouterTypes> = () => {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <Button type="primary">Hello World</Button>
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
}

export default App;
