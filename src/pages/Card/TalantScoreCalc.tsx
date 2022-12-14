import { IKeyValue } from '../../interface/common';

interface ICardData {
  characterArea: IKeyValue;
  characterRank: IKeyValue;
  teamArea: IKeyValue;
  attrArea: IKeyValue;
  leader: IKeyValue;
  subLeader: IKeyValue;
  member1: IKeyValue;
  member2: IKeyValue;
  member3: IKeyValue;
  bonus: FormDataEntryValue | null;
}

const validationRankArea = (key: string, value: FormDataEntryValue | null) => {
  if (!value) {
    document.getElementById(key)!.focus();
    alert("값을 입력해주세요.");
    return false;
  } else {
    return true;
  }
}

const validationCard = (id: string, key: string, value: FormDataEntryValue | null) => {
  if (!value) {
    if (key === `${id}_performance` || key === `${id}_stamina` || key === `${id}_technique`)
      document.getElementById(key)!.focus();
    else
      document.getElementById(`mui-component-select-${key}`)!.focus();
    alert("값을 입력해주세요.");
    return false;
  } else {
    return true;
  }
}

export const talantScore = (event: any) => {
  const formData = new FormData(event.currentTarget);
  let characterArea = {};
  let characterRank = {};
  let teamArea = {};
  let attrArea = {};
  let leader = {};
  let subLeader = {};
  let member1 = {};
  let member2 = {};
  let member3 = {};
  for (let key of formData.keys()) {
    let id = key.split('_')[0];
    let value = formData.get(key);
    if (id === 'teamArea') {
      teamArea = { ...teamArea, [key]: value }
      if (!validationRankArea(key, value)) return false;
    } else if (id === 'attrArea') {
      attrArea = { ...attrArea, [key]: value }
      if (!validationRankArea(key, value)) return false;
    } else if (key === 'titleBonus') {
      if (!validationRankArea(key, value)) return false;
    } else if (id === 'characterArea') {
      characterArea = { ...characterArea, [key]: value }
      if (!validationRankArea(key, value)) return false;
    } else if (id === 'characterRank') {
      characterRank = { ...characterRank, [key]: value }
      if (!validationRankArea(key, value)) return false;
    } else if (id === 'Leader') {
      leader = { ...leader, [key]: value }
      if (!validationCard(id, key, value)) return false;
    } else if (id === 'SubLeader') {
      subLeader = { ...subLeader, [key]: value }
      if (!validationCard(id, key, value)) return false;
    } else if (id === 'Member1') {
      member1 = { ...member1, [key]: value }
      if (!validationCard(id, key, value)) return false;
    } else if (id === 'Member2') {
      member2 = { ...member2, [key]: value }
      if (!validationCard(id, key, value)) return false;
    } else if (id === 'Member3') {
      member3 = { ...member3, [key]: value }
      if (!validationCard(id, key, value)) return false;
    }
  }
  const cardData: ICardData = {
    characterArea: characterArea,
    characterRank: characterRank,
    teamArea: teamArea,
    attrArea: attrArea,
    leader: leader,
    subLeader: subLeader,
    member1: member1,
    member2: member2,
    member3: member3,
    bonus: formData.get('titleBonus')
  }

  return talantScoreCalc(cardData);
}

export const talantScoreCalc = (props: ICardData) => {
  const leaderTeam = props.leader.Leader_team;
  const subLeaderTeam = props.subLeader.SubLeader_team;
  const member1Team = props.member1.Member1_team;
  const member2Team = props.member2.Member2_team;
  const member3Team = props.member3.Member3_team;
  const leaderSubUnit = props.leader.Leader_subUnit;
  const subLeaderSubUnit = props.subLeader.SubLeader_subUnit;
  const member1SubUnit = props.member1.Member1_subUnit;
  const member2SubUnit = props.member2.Member2_subUnit;
  const member3SubUnit = props.member3.Member3_subUnit;
  const leaderAttr = props.leader.Leader_attr;
  const subLeaderAttr = props.subLeader.SubLeader_attr;
  const member1Attr = props.member1.Member1_attr;
  const member2Attr = props.member2.Member2_attr;
  const member3Attr = props.member3.Member3_attr;
  let teamBonus = 'none';
  if (leaderTeam === subLeaderTeam && leaderTeam === member1Team && leaderTeam === member2Team && leaderTeam === member3Team) {
    teamBonus = 'piapro'
  } else if (leaderSubUnit === subLeaderSubUnit && leaderSubUnit === member1SubUnit && leaderSubUnit === member2SubUnit && leaderSubUnit === member3SubUnit) {
    teamBonus = 'unit';
  }

  let attrBonus = 'N';
  if (leaderAttr === subLeaderAttr && leaderAttr === member1Attr && leaderAttr === member2Attr && leaderAttr === member3Attr)
    attrBonus = 'Y';

  const leader = memberBonus(props.leader, props.characterArea, props.characterRank, props.teamArea, props.attrArea, teamBonus, attrBonus);
  const subLeader = memberBonus(props.subLeader, props.characterArea, props.characterRank, props.teamArea, props.attrArea, teamBonus, attrBonus);
  const member1 = memberBonus(props.member1, props.characterArea, props.characterRank, props.teamArea, props.attrArea, teamBonus, attrBonus);
  const member2 = memberBonus(props.member2, props.characterArea, props.characterRank, props.teamArea, props.attrArea, teamBonus, attrBonus);
  const member3 = memberBonus(props.member3, props.characterArea, props.characterRank, props.teamArea, props.attrArea, teamBonus, attrBonus);
  interface ITotalScore {
    totalScore: number;
    titleBonus: number;
    areaBonus: number;
    rankBonus: number;
    ptsScore: number;
  }
  const totalScore: ITotalScore = {
    totalScore: leader.resultBonus + subLeader.resultBonus + member1.resultBonus + member2.resultBonus + member3.resultBonus + Number(props.bonus),
    titleBonus: Number(props.bonus),
    areaBonus: leader.cAreaBonus + subLeader.cAreaBonus + member1.cAreaBonus + member2.cAreaBonus + member3.cAreaBonus,
    rankBonus: leader.cRankBonus + subLeader.cRankBonus + member1.cRankBonus + member2.cRankBonus + member3.cRankBonus,
    ptsScore: 0
  };
  totalScore.ptsScore = totalScore.totalScore - totalScore.titleBonus - totalScore.areaBonus - totalScore.rankBonus

  return totalScore;
}

interface IResultBonus {
  resultBonus: number;
  cAreaBonus: number;
  cRankBonus: number;
}

interface IPTSValue {
  performance: number;
  technique: number;
  stamina: number;
  rankBonus: number;
  areaBonus: number;
}

const memberBonus = (card: IKeyValue, characterArea: IKeyValue, characterRank: IKeyValue,
  teamArea: IKeyValue, attrArea: IKeyValue, teamBonus: string, attrBonus: string) => {
  let performance = 0;
  let technique = 0;
  let stamina = 0;
  let characterAreaBonus = 0;
  let characterRankBonus = 0;
  let subUnitAreaBonus = 0;
  let teamAreaBonus = 0;
  let attrAreaBonus = 0;
  let areaBonus = 0;
  let vsingerUnit = 'N';
  for (let key in card) {
    let cardId = key.substring(key.indexOf('_') + 1);
    let cardValue = card[key];
    if (cardId === 'performance')
      performance = Number(cardValue);
    if (cardId === 'technique')
      technique = Number(cardValue);
    if (cardId === 'stamina')
      stamina = Number(cardValue);
    if (cardId === 'character') {
      for (let subKey in characterArea) {
        let subId = subKey.substring(subKey.indexOf('_') + 1)
        let subValue = characterArea[subKey];
        if (subId === cardValue) {
          characterAreaBonus = Number(subValue);
          break;
        }
      }
      for (let subKey in characterRank) {
        let subId = subKey.substring(subKey.indexOf('_') + 1)
        let subValue = characterRank[subKey];
        if (subId === cardValue) {
          characterRankBonus = Number(subValue);
          break;
        }
      }
    }
    if (cardId === 'subUnit' || cardId === 'team') {
      if (cardId === 'subUnit')
        vsingerUnit = cardValue === 'piapro' ? 'Y' : 'N';
      for (let subKey in teamArea) {
        let subId = subKey.substring(subKey.indexOf('_') + 1)
        let subValue = teamArea[subKey];
        if (subId === cardValue) {
          if (cardId === 'subUnit') {
            subUnitAreaBonus = Number(subValue);
            break;
          } else if (cardId === 'team') {
            teamAreaBonus = Number(subValue);
            break;
          }
        }
      }
    }
    if (cardId === 'attr') {
      for (let subKey in attrArea) {
        let subId = subKey.substring(subKey.indexOf('_') + 1)
        let subValue = attrArea[subKey];
        if (subId === cardValue) {
          attrAreaBonus = Number(subValue);
          break;
        }
      }
    }
  }
  if (teamBonus === 'piapro') {
    if (vsingerUnit === 'Y')
      teamAreaBonus += teamAreaBonus;
    else
      teamAreaBonus = teamAreaBonus > subUnitAreaBonus ? teamAreaBonus : subUnitAreaBonus
  } else if (teamBonus === 'unit') {
    subUnitAreaBonus += subUnitAreaBonus;
    teamAreaBonus = subUnitAreaBonus;
  } else
    teamAreaBonus = teamAreaBonus > subUnitAreaBonus ? teamAreaBonus : subUnitAreaBonus
  if (attrBonus === 'Y')
    attrAreaBonus += attrAreaBonus;

  areaBonus = characterAreaBonus + teamAreaBonus + attrAreaBonus;
  const value: IPTSValue = {
    performance: performance,
    technique: technique,
    stamina: stamina,
    rankBonus: characterRankBonus,
    areaBonus: areaBonus
  }

  const cAreaBonus = getBonus(value, 'area');
  const cRankBonus = getBonus(value, 'rank');
  const resultBonus: IResultBonus = {
    resultBonus: cAreaBonus + cRankBonus + performance + technique + stamina,
    cAreaBonus: cAreaBonus,
    cRankBonus: cRankBonus
  }

  return resultBonus;
}

const getCommonBonus = (type: string, rankBonus: number, areaBonus: number) => Number(type === 'rank' ? rankBonus / 1000 : areaBonus / 100);
const getPerformanceBonus = (props: IPTSValue, type: string) => Math.floor(Number(props.performance) * getCommonBonus(type, props.rankBonus, props.areaBonus));
const getTechniqueBonus = (props: IPTSValue, type: string) => Math.floor(Number(props.technique) * getCommonBonus(type, props.rankBonus, props.areaBonus));
const getStaminaBonus = (props: IPTSValue, type: string) => Math.floor(Number(props.stamina) * getCommonBonus(type, props.rankBonus, props.areaBonus));
const getBonus = (props: IPTSValue, type: string) => getPerformanceBonus(props, type) + getTechniqueBonus(props, type) + getStaminaBonus(props, type);

// const getPerformanceBonus = (props: IPTSValue, type: string) => {
//   const bonus = Math.floor(Number(props.performance) * Number(type === 'rank' ? props.rankBonus / 1000 : props.areaBonus / 100));
//   return bonus;
// }