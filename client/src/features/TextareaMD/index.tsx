import React, {useCallback, useMemo} from 'react';
import { FormInstance } from 'antd';
import dynamic from "next/dynamic";

// Нашел решение в интернете. Иначе будет ошибка, что модуль не найдет (из-за SSR)
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type Props = {
  text: string;
  setText: (value: string) => void;
  form: FormInstance;
  style:  React.CSSProperties;
};

const TextareaMD = (props: Props) => {
  const { text, setText, form, style } = props;

  const textAreaOptions = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: false,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'TextareaMD',
      },
    }),
    []
  );

  const onPostBodyChange = useCallback((value: string) => {
    setText(value);
    form.setFieldsValue({
      body: value,
    });
  }, []);

  return (
    <SimpleMDE
      value={text}
      onChange={onPostBodyChange}
      style={style}
      options={textAreaOptions}
    />
  );
};

export default TextareaMD;
