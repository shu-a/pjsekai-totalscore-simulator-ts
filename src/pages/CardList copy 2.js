import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { flexbox } from '@mui/system';
import axios from 'axios';
import MakeFormSelect from '../components/MakeFormSelect';
import MakeCard from '../components/MakeCard';
import MakeTextField from '../components/MakeTextField';

export default function CardList() {
  const [disabled, setDisabled] = useState(true);
  // 속성 목록 불러오기
  const [attrList, setAttrList] = useState([]);
  const getAttrList = () => {
    const attrList = [{
      "seq": 46,
      "areaItemId": 46,
      "level": 1,
      "targetUnit": "any",
      "targetCardAttr": "cool",
      "unit": "cool",
      "unitName": "쿨"
    },
    {
      "seq": 48,
      "areaItemId": 48,
      "level": 1,
      "targetUnit": "any",
      "targetCardAttr": "cute",
      "unit": "cute",
      "unitName": "큐트"
    },
    {
      "seq": 50,
      "areaItemId": 50,
      "level": 1,
      "targetUnit": "any",
      "targetCardAttr": "pure",
      "unit": "pure",
      "unitName": "퓨어"
    },
    {
      "seq": 52,
      "areaItemId": 52,
      "level": 1,
      "targetUnit": "any",
      "targetCardAttr": "happy",
      "unit": "happy",
      "unitName": "해피"
    },
    {
      "seq": 54,
      "areaItemId": 54,
      "level": 1,
      "targetUnit": "any",
      "targetCardAttr": "mysterious",
      "unit": "mysterious",
      "unitName": "미스테리어스"
    }];
    setAttrList(attrList);
  }
  useEffect(() => {
    getAttrList();
  }, []);

  // 팀 목록 불러오기
  const [teamList, setTeamList] = useState([]);
  const getTeamList = async () => {
    try {
      const response = await axios.get('https://shu-a.github.io/sekai-master-db-kr-diff/unitProfiles.json');
      setTeamList(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTeamList();
  }, []);

  // 캐릭터 목록 불러오기
  const [characterList, setCharacterList] = useState([]);
  const getCharacterList = async () => {
    try {
      const response = await axios.get('https://shu-a.github.io/sekai-master-db-kr-diff/gameCharacters.json');
      setCharacterList(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCharacterList();
  }, [])

  // 성급 목록 불러오기
  const [raritiesList, setRaritiesList] = useState([]);
  const getRaritiesList = async () => {
    const response = await axios.get('https://shu-a.github.io/sekai-master-db-diff/cardRarities.json');
    setRaritiesList(response.data);
  }
  useEffect(() => {
    getRaritiesList();
  }, []);

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
  }

  const _characterList = [];
  const [__characterList, __setCharacterList] = useState([]);
  const HandlerSelectTeam = (event) => {
    const value = event.target.value;
    setTeam(value);
    setCharacter('');
    if (value)
      setDisabled(false);
    else
      setDisabled(true);
    for (let i = 0; i < characterList.length; i++) {
      let character = characterList[i]
      let characterName = character.firstName ? character.firstName + ' ' + character.givenName : character.givenName;
      if (value === ('team_' + character.unit))
        _characterList.push(<MenuItem key={'character_' + character.id} value={'character_' + character.id}>{characterName}</MenuItem>);
      __setCharacterList(_characterList);
    }
  }
  const HandlerSelectRarities = (event) => {
    setRarities(event.target.value);
  }
  const HandlerSelectCharacter = (event) => {
    setCharacter(event.target.value);
  }

  const _affiliationList = [];
  for (let i = 0; i < teamList.length; i++) {
    let team = teamList[i];
    _affiliationList.push(<MenuItem key={'affiliation_' + team.unit} value={'affiliation_' + team.unit}>{team.unitName}</MenuItem>);
  }
  const _attrList = [];
  for (let i = 0; i < attrList.length; i++) {
    let attr = attrList[i];
    _attrList.push(<MenuItem key={'attr_' + attr.seq} value={'attr_' + attr.seq}>{attr.unitName}</MenuItem>);
  }
  const _teamList = [];
  for (let i = 0; i < teamList.length; i++) {
    let team = teamList[i];
    if (Number(team.seq) !== 1)
      _teamList.push(<MenuItem key={'team_' + team.unit} value={'team_' + team.unit}>{team.unitName}</MenuItem>);
  }
  const _raritiesList = [];
  for (let i = 0; i < raritiesList.length; i++) {
    let rarities = raritiesList[i];
    _raritiesList.push(<MenuItem key={'rarities_' + rarities.seq} value={'rarities_' + rarities.seq} >{rarities.cardRarityType.split('_')[1]}</MenuItem>);
  }

  const makeFormSelect = [];
  // const makeCardNum = 5;

  const makeFormSelectContents = [
    { sx: { m: 1, width: 256 }, id: 'attr', label: '속성', value: attr, handler: HandlerSelectAttr, selectList: _attrList},
    { sx: { m: 1, width: 120 }, id: 'affiliation', label: '소속', value: affiliation, handler: HandlerSelectAffiliation, selectList: _affiliationList},
    { sx: { m: 1, width: 120 }, id: 'team', label: '팀', value: team, handler: HandlerSelectTeam, selectList: _teamList},
    { sx: { m: 1, width: 120 }, id: 'rarities', label: '성급', value: rarities, handler: HandlerSelectRarities, selectList: _raritiesList},
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
    <div>
      <MakeCard
        sx={{
          minWidth: 300,
          maxWidth: 300,
          paddingBottom: 2,
          margin: 0.5,
          marginTop: 3,
          display: flexbox
        }}
        id="teamCard"
        key="teamCard"
        title="Reader"
        content={makeFormSelect}
      />
    </div>
  );
}