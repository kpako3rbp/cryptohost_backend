import {Row, Col, Typography, Button, theme} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Link from "next/link";

import styles from './index.module.scss';

const { Title } = Typography;

type Props = {
  title: string;
  buttonText: string;
  buttonLink: string;
}

const PageHeaderWithButton = (props: Props) => {
  const { title, buttonText, buttonLink } = props;
  const {
    token: { borderRadiusSM },
  } = theme.useToken();

  return (
    <Row align={'stretch'} justify={'space-between'} className={styles.pageHeader}>
      <Col>
        <Title level={2} className={styles.pageHeaderTitle}>{title}</Title>
      </Col>
      <Col>
        <Link href={buttonLink} className={styles.pageHeaderButton}>
          <Button size="large" type={'primary'} icon={<PlusOutlined />} style={{borderRadius: borderRadiusSM, marginBottom: '0.5em'}}>
            {buttonText}
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default PageHeaderWithButton;
