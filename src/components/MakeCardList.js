import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import MakeFormSelect from '../components/MakeFormSelect';
import MakeCard from '../components/MakeCard';
import MakeTextField from '../components/MakeTextField';

export default function MakeCardList(props) {
  const [disabled, setDisabled] = useState(true);
  // 값 및 핸들러
  const [attr, setAttr] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [team, setTeam] = useState('');
  const [character, setCharacter] = useState('');
  const [rarities, setRarities] = useState('');
  const HandlerSelectAttr = (event) => {
    setAttr(event.target.value);
  }
  const HandlerSelectAffiliation = (event) => {
    setAffiliation(event.target.value);
    enableCharacter(event.target.value);
  }
  const HandlerSelectTeam = (event) => {
    setTeam(event.target.value);
  }
  const HandlerSelectRarities = (event) => {
    setRarities(event.target.value);
  }
  const HandlerSelectCharacter = (event) => {
    setCharacter(event.target.value);
  }

  const _characterList = [];
  const [__characterList, __setCharacterList] = useState([]);
  const enableCharacter = (value) => {
    setCharacter('');
    if (value)
      setDisabled(false);
    else
      setDisabled(true);
    for (let i = 0; i < props.characterList.length; i++) {
      let character = props.characterList[i]
      let characterName = character.firstName ? character.firstName + ' ' + character.givenName : character.givenName;
      if (value === ('affiliation_' + character.unit))
        _characterList.push(<MenuItem key={character.id} value={'character_' + character.id}>{characterName}</MenuItem>);
      __setCharacterList(_characterList);
    }
  }

  const _affiliationList = [];
  for (let i = 0; i < props.teamList.length; i++) {
    let team = props.teamList[i];
    _affiliationList.push(<MenuItem key={'affiliation_' + team.unit} value={'affiliation_' + team.unit}>{team.unitName}</MenuItem>);
  }
  const _attrList = [];
  for (let i = 0; i < props.attrList.length; i++) {
    let attr = props.attrList[i];
    _attrList.push(<MenuItem key={'attr_' + attr.seq} value={'attr_' + attr.seq}>{attr.unitName}</MenuItem>);
  }
  const _teamList = [];
  for (let i = 0; i < props.teamList.length; i++) {
    let team = props.teamList[i];
    if (Number(team.seq) !== 1)
      _teamList.push(<MenuItem key={'team_' + team.unit} value={'team_' + team.unit}>{team.unitName}</MenuItem>);
  }
  const _raritiesList = [];
  for (let i = 0; i < props.raritiesList.length; i++) {
    let rarities = props.raritiesList[i];
    _raritiesList.push(<MenuItem key={'rarities_' + rarities.seq} value={'rarities_' + rarities.seq} >{rarities.cardRarityType.split('_')[1]}</MenuItem>);
  }

  const makeFormSelect = [];
  // const makeCardNum = 5;

  const makeFormSelectContents = [
    { sx: { m: 1, width: 256 }, id: 'attr', label: '속성', value: attr, handler: HandlerSelectAttr, selectList: _attrList },
    { sx: { m: 1, width: 120 }, id: 'affiliation', label: '소속', value: affiliation, handler: HandlerSelectAffiliation, selectList: _affiliationList },
    { sx: { m: 1, width: 120 }, id: 'team', label: '팀', value: team, handler: HandlerSelectTeam, selectList: _teamList },
    { sx: { m: 1, width: 120 }, id: 'rarities', label: '성급', value: rarities, handler: HandlerSelectRarities, selectList: _raritiesList },
    { sx: { m: 1, width: 120 }, id: 'character', label: '캐릭터명', value: character, handler: HandlerSelectCharacter, selectList: __characterList, disabled: disabled, helperText: '팀을 선택하세요.' }
  ];
  const makeFormSelectlist = makeFormSelectContents.map((c) =>
    <MakeFormSelect key={c.id} id={c.id} sx={c.sx} label={c.label} inputLabel={c.label} value={c.value} handler={c.handler} selectList={c.selectList} disabled={c.disabled}
      helperText={c.makeFormSelectlist} />
  );
  makeFormSelect.push(makeFormSelectlist);

  const makeTextFieldContents = [
    { id: 'performance', label: 'Performance', type: 'number', sx: { width: 256, marginTop: 1 } },
    { id: 'technique', label: 'Technique', type: 'number', sx: { width: 256, marginTop: 1 } },
    { id: 'stamina', label: 'Stamina', type: 'number', sx: { width: 256, marginTop: 1 } }
  ];
  const makeTextFieldList = makeTextFieldContents.map((c) =>
    <MakeTextField key={c.id} id={c.id} label={c.label} defaultValue='' type={c.type} sx={c.sx} />
  );
  makeFormSelect.push(makeTextFieldList);
  return (
      <MakeCard
        sx={{
          width: 298,
          paddingBottom: 2,
          margin: 0.5,
          marginTop: 1,
          border: props.border,
          borderColor: props.color
        }}
        id="teamCard"
        key="teamCard"
        title={props.title}
        content={makeFormSelect}
      />
  );
}