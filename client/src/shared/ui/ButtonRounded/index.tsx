import cl from 'classnames';
import React from 'react';

import styles from './index.module.scss';
import {Button, Popover, Space, theme} from 'antd';
import Link from 'next/link';
import {DeleteOutlined} from "@ant-design/icons";

type Props = {
  popover?: string | undefined;
  type?:  "link" | "text" | "default" | "primary" | "dashed" | undefined;
  danger?: boolean | undefined;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  icon?: React.ReactNode | false;
};

const ButtonRounded = (props: Props) => {
  const { popover, type, onClick, icon = false, danger } = props;
  const {
    token: {
      borderRadiusSM,
      boxShadowTertiary,
    },
  } = theme.useToken();

  if (!popover) {
    return (
      <Button
        type={type}
        onClick={onClick}
        style={{
          borderRadius: borderRadiusSM,
          boxShadow: boxShadowTertiary,
        }}
        icon={icon}
        danger={danger}
      />
    )
  }

  return (
    <Popover content={popover}>
      <Button
        type={type}
        onClick={onClick}
        style={{
          borderRadius: borderRadiusSM,
          boxShadow: boxShadowTertiary,
        }}
        icon={icon}
        danger={danger}
      />
    </Popover>
  );
};

export default ButtonRounded;
