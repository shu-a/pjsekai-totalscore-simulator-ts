import React from 'react';
import { IMakePropsTitle } from '../interface/make';
import MakeCard from './MakeCard';

interface IProps extends IMakePropsTitle {
  subheader: string;
  clearHandler: any;
  border: any;
  color: string;
  backgroundColor: string;
  // makeFormSelect: JSX.Element[]
  makeFormSelect: any;
}

export default function MakeMemberCard(props: IProps) {
  /* 옵션
  sx
  id
  title
  content
  */
  return (
    <MakeCard
      sx={{
        width: 298,
        maxWidth: 310,
        pb: 2,
        ml: 0.5,
        mr: 0.5,
        mb: 0.5,
        border: props.border,
        borderColor: props.color,
        backgroundColor: props.backgroundColor
      }}
      clearHandler={props.clearHandler}
      id="teamCard"
      key="teamCard"
      title={props.title}
      content={props.makeFormSelect}
      subheader={props.subheader}
    />
  );
}