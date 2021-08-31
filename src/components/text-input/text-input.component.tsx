import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { textCount, textState } from "atoms/text";

function TextInput() {
  const [text, setText] = useRecoilState(textState);
  const count = useRecoilValue(textCount);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChangeText} />
      <p>
        입력 문자열 : <strong>{text}</strong>
      </p>
      <p>
        입력 문자열의 길이 : <strong>{count}</strong>
      </p>
    </div>
  );
}

export default TextInput;
