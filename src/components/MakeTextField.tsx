import React, { Fragment } from 'react';
import { IMakeProps } from '../interface/make';
import TextField from '@mui/material/TextField';

interface IProps extends IMakeProps {
  label: string;
  value: string | number;
  handler: any;
  type: string;
  inputProps: any;
}

export default function MakeTextField(props: IProps) {
  let propsId = String(props.id);
  /* 옵션
  id
  label
  defaultValue
  type
  sx
  inputProps
  */
  return (
    <Fragment>
      <TextField
        id={propsId}
        key={props.id}
        label={props.label}
        value={props.value}
        onChange={props.handler}
        variant="standard"
        type={props.type}
        sx={props.sx}
        name={propsId}
        inputProps={props.inputProps}
      />
    </Fragment>
  );
}