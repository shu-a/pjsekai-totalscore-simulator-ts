import React, { Fragment } from 'react';
import { IMakePropsTitle } from '../common/common';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

interface IProps extends IMakePropsTitle {
  subheader: string
  content: JSX.Element[]
  clearHandler: any
}

export default function MakeCard(props: IProps) {
  /* 옵션
  sx
  id
  title
  subheader
  content
  */
  return (
    <Fragment>
      <Card
        variant="outlined"
        sx={props.sx}
        key={props.id}
        // name={props.id}
      >
        <CardHeader
          action={
            <IconButton aria-label={'ariaLabel_' + props.id} onClick={props.clearHandler}>
              <RefreshIcon />
            </IconButton>
          }
          title={props.title}
          subheader={props.subheader}
          key={props.id}
          name={props.id}
        />
        {props.content}
      </Card>
    </Fragment>
  );
}