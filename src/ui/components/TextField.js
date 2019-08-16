import { TextField as VisualTextField } from '@shopify/polaris';
import { asField } from 'informed';

const TextField = asField(({ fieldState, fieldApi, ...props }) => {
  const { value, error } = fieldState;
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
      value={!value && value !== 0 ? '' : value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
    />
  );
});

export default TextField;
