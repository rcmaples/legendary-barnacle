// @ts-nocheck

import { useCallback } from 'react';
import { Box, Stack, Text, TextInput } from '@sanity/ui';
import { useFormValue, StringInputProps, set, unset } from 'sanity';

export function CustomStringInput(props: StringInputProps) {
  const slug = useFormValue(['slug']);

  const {
    onChange,
    value = '',
    id,
    focusRef,
    onBlur,
    onFocus,
    readOnly,
  } = props;

  // ⬇ We aren't doing anything with these except forwarding them to our input.
  const fwdProps = { id, ref: focusRef, onBlur, onChange, onFocus, readOnly };
  set(slug?.current);

  return (
    <Stack space={3}>
      <TextInput {...fwdProps} value={slug?.current} />
    </Stack>
  );
}

// // @ts-nocheck
// import { useCallback } from 'react';
// import { Stack, TextInput } from '@sanity/ui';

// import { set, unset } from 'sanity';

// import { useFormValue } from 'sanity';

// export const CustomStringInput = (props) => {
//   const slug = useFormValue(['slug']);

//   const handleChange = (event) => {
//     const nextValue = event.currentTarget.value;
//     onChange(nextValue ? set(nextValue) : unset());
//   };

//   const { elementProps, onChange, value = `${slug?.current}` } = props;
//   // don't try this at home, kids
//   // elementProps.value = slug?.current;
//   // elementProps.readOnly = true;

//   return (
//     <Stack space={3}>
//       {/* {props.renderDefault(props)} */}
//       <TextInput
//         {...elementProps}
//         // readOnly={true}
//         onChange={handleChange}
//         value={value}
//       />
//     </Stack>
//   );
// };
