import { TextField as VisualTextField } from '@shopify/polaris';
import { asField } from 'informed';

const TextField = asField(({ fieldState, fieldApi, ...props }) => {
  const { error , maskedValue } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { onChange, onBlur, initialValue, forwardedRef, ...rest } = props;

  const handleChange = value => {
    setValue(value);

    if (onChange) {
      onChange()
    }
  };

  const handleBlur = () => {
    setTouched(true);

    if (onBlur) {
      onBlur();
    }
  };

  return (
    <VisualTextField
      {...rest}
      ref={forwardedRef}
      value={maskedValue || initialValue || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
    />
  );
});

export default TextField;
