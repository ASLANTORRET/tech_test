import { forwardRef } from 'react';

function Input(props, ref) {
  return <input ref={ref} name="simpleInput" type="text" />;
}
export default forwardRef(Input);
