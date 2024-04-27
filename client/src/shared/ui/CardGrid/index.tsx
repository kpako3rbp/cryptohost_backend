import cl from 'classnames';
import React from 'react';

import styles from './index.module.scss';
import {Col, Flex, Row} from 'antd';
import { Gutter } from 'antd/es/grid/row';

type Props = {
  children: React.ReactNode[];
  // gutter?: Gutter | [Gutter, Gutter];
};

const CardGrid = (props: Props) => {
  const { children } = props;

  return (
    <Flex wrap="wrap" gap="small">
      {children.map((child, index) => {
        const key = `col-${index}`;
        return (
          <Col
            key={key}
            xs={{ flex: '100%' }}
            sm={{ flex: '100%' }}
            md={{ flex: '100%' }}
            lg={{ flex: '100%' }}
            xl={{ flex: '100%' }}
          >
            {child}
          </Col>
        );
      })}
    </Flex>
  );
};

export default CardGrid;
