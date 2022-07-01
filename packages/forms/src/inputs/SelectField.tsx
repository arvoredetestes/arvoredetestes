import { MessageKeys, useText } from "@monorepo/texts";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { useField, useFormikContext } from "formik";
import find from "lodash/find";
import map from "lodash/map";
import React, { useCallback } from "react";

interface Option<T> {
  value: T;
  name: string | React.ReactElement;
}

type Options<T> = Option<T>[];

interface SelectFieldProps<T> {
  label: MessageKeys;
  id: string;
  options: Options<T>;
  submitOnChange?: boolean;
}

type Value = string | number;

export type SelectFieldAllProps = SelectFieldProps<Value> & SelectProps;

const SX = {
  width: 200,
  marginX: 1,
};
export const SelectField: React.FC<SelectFieldAllProps> = ({
  id,
  label,
  options,
  submitOnChange,
  ...rest
}) => {
  const { submitForm } = useFormikContext();
  const text = useText({ key: label });
  const [field, meta, helpers] = useField(id);
  const errorText = useText({ key: meta.error as MessageKeys });

  const handleChange = useCallback(
    async (event: SelectChangeEvent) => {
      if (rest.multiple) {
        field.onChange(event);
      } else {
        helpers.setValue(find(options, { value: event.target.value })?.value);
      }
      if (submitOnChange) {
        await submitForm();
      }
    },
    [field, helpers, options, rest.multiple, submitForm, submitOnChange]
  );

  const error = !!(meta.touched && meta.error);
  return (
    <FormControl fullWidth sx={SX} size='small'>
      <InputLabel id={id}>{text}</InputLabel>
      <Select
        id={id}
        name={id}
        value={field.value}
        label={text}
        onChange={handleChange}
        error={error}
        {...rest}
      >
        {map(options, (option) => {
          return (
            <MenuItem value={option.value} key={option.value}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
      {error && <FormHelperText error={error}>{errorText}</FormHelperText>}
    </FormControl>
  );
};
