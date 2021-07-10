import React from 'react'
import { useField } from 'formik'
import { TextField as MTextField } from '@material-ui/core'

const TextField = ({
  label,
  autoComplete,
  autoFocus,
  type,
  fullWidth,
  ...props
}) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''

  return (
    <MTextField
      label={label}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      type={type}
      fullWidth={fullWidth}
      helperText={errorText}
      error={!!errorText}
      {...field}
    />
  )
}

export default TextField
