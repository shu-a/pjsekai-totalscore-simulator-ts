import React, { useState, useEffect, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { flexbox } from '@mui/system';
import { getCharacterList } from '../apis/apiClient'
import MakeFormSelect from '../components/MakeFormSelect';
import MakeCard from '../components/MakeCard';
import MakeTextField from '../components/MakeTextField';

function switchiId(props) {
  switch (props) {
    case 'area':
      return 'characterArea_';
    case 'rank':
      return 'characterRank_';
    default:
      return '';
  }
}

function switchTitle(props) {
  switch (props) {
    case 'area':
      return '캐릭터 에어리어';
    case 'rank':
      return '캐릭터 랭크';
    default:
      return '';
  }
}

export default function CharacterArea(props) {
  const [characterList, setCharacterList] = useState([]);
  useEffect(() => {
    getCharacterList().then((resData) => setCharacterList(resData));
  }, []);
  const type = switchiId(props.type);
  const textField = [];
  const makeFieldList = characterList.map((c) =>
    <MakeTextField key={type + c.id} id={type + c.id} label={c.firstName ? c.firstName + ' ' + c.givenName : c.givenName} defaultValue=''
    type={'number'} sx={{width: 256, margin: 1}} />
  );
  textField.push(makeFieldList);
  return (
    <MakeCard
      sx={{
        minWidth: 300,
        maxWidth: 600,
        paddingBottom: 2,
        margin: 0.5,
        marginTop: 3,
        display: flexbox
      }}
      id="teamCard"
      key="teamCard"
      title={switchTitle(props.type)}
      content={textField}
    />
  );
}