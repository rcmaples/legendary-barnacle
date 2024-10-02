// @ts-nocheck

import { useCallback, useState, useEffect } from 'react';
import { Box, Stack, Text, TextInput } from '@sanity/ui';
import { useFormValue, StringInputProps, set, unset } from 'sanity';

export function CustomStringInput(props: StringInputProps) {
  const [emojiTitle, setEmojiTitle] = useState('');

  const formSlug = useFormValue(['slug']);

  const {
    onChange,
    value = '',
    id,
    focusRef,
    onBlur,
    onFocus,
    readOnly,
  } = props;

  useEffect(() => {
    setEmojiTitle(formSlug?.current || '');
    onChange(formSlug ? set(formSlug.current) : unset());
  }, [formSlug, emojiTitle, onChange]);

  // ⬇ We aren't doing anything with these except forwarding them to our input.
  const fwdProps = { id, ref: focusRef, onBlur, onFocus, readOnly };

  return (
    <Stack space={2}>
      <TextInput {...fwdProps} value={emojiTitle} readOnly />
    </Stack>
  );
}
