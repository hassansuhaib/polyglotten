import React from 'react'
import { useField } from 'formik'

import { Select as MSelect } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

const Select = ({ label, id, ...props }) => {
  const [field] = useField(props)

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <MSelect labelId={id} {...field}>
        {props.children}
      </MSelect>
    </FormControl>
  )
}

export default Select
