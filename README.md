# Recoil Apps
- Recoil을 사용해보기 [여기](https://thirsty-cray-4acb65.netlify.app/)

## Atom
__Atom__ 은 __상태\(state\)__ 의 일부를 나타낸다. Atoms는 어떤 컴포너느에서나 읽고 쓸 수 있다. atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구동한다. 그래서 atom에 어떤 변화가 있으면 그 atom을 구동하는 모든 컴포넌트들이 re-rendering 되는 결과가 발생할 것이다.

```javascript
const textState = atom({
  key:'textState', // unique ID (with respect to other atoms/selectors)
  default:'', // default value (aka initial value)
})
```

컴포넌트가 atom을 읽고 쓰게 하기위해서는 useRecoilState()를 사용할 수 있다.

```javascript
function CharacterCounter(){
  return (
    <>
      <TextInput/>
      <Display/>
    </>
  )
}

function TextInput(){
  const [text, setText] = useRecoilState(textState);

  const onChange = (evt) => {
    setText(evt.target.value)
  }

  return(
    <div>
      <input type="text" value={text} onChange={onChange}/>
      <br/>
      <span>Input Text : {text}</span>
    </div>
  )
}
```

## Selector 
__Selector__ 는 파생된 상태의 일부를 나타낸다. 파생된 상태는 상태의 변화다. 파생된 상태를 어떤 방법으로드 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.

```javascript
const charCountState = selector({
  key:'charCountState',
  get:({get}) => {
    const text = get(textState);
    return text.length
  }
})
```
> atom의 getter 같은 느낌인가?

__useRecoilValue()__ 훗을 사용해서 charCountState 값을 읽을 수 있다.

```javascript
function CharacterCount(){
  const count = useRecoilValue(charCountState);
  return <span>문자열의 길이: {count}</span>
}
```