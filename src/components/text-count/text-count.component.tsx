import React from "react";
import { useRecoilValue } from "recoil";

import { textCount } from "atoms/text";

function TextCount() {
  const count = useRecoilValue(textCount);
  return (
    <p>
      입력 문자열의 길이 : <strong>{count}</strong>
    </p>
  );
}

export default TextCount;
