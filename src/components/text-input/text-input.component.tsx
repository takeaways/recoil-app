import React from "react";
import { useRecoilState } from "recoil";

import { textState } from "atoms/text";

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChangeText} />
      <p>
        입력 문자열 : <strong>{text}</strong>
      </p>
    </div>
  );
}

export default TextInput;
