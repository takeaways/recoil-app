import { atom, selector } from "recoil";

export const textState = atom({
  key: "textState",
  default: "",
});

export const textCount = selector({
  key: "textCount",
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});
