import { Button, Form } from 'antd';
import { Alert } from 'antd';
import styles from './index.module.css';
import { TeamOutlined } from '@ant-design/icons';

type Props = {
	message?: string;
};

const ErrorMessage = ({ message }: Props) => {
	if (!message) {
		return null;
	}
	return <Alert message={message} type="error" />;
};

export default ErrorMessage;
