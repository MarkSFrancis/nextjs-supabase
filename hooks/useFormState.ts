import { ChangeEvent, useCallback, useState } from 'react';

export const useFormState = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  return [value, onChange, { setValue }] as const;
};
