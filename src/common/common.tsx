export interface IKeyValue {
  [key: string]: string | number;
}

export interface IMakeProps {
  sx: any;
  id: string | number;
}

export interface IMakePropsTitle extends IMakeProps {
  title: string;
}

export interface ICardContents {
  key: number;
  teamList: Array<ITeamList>;
  attrList: Array<IAttrList>;
  characterList: Array<ICharacterList>;
  raritiesList: Array<IRariteisList>;
  title: string;
  border: number;
  color: string;
  backgroundColor: string;
}

export interface ITeamList {
  unit: string;
  unitName: string;
  seq: number;
  profileSentence: string;
  colorCode: string;
}

export interface IAttrList {
  seq: number;
  areaItemId: number;
  level: number;
  targetUnit: string;
  targetCardAttr: string;
  unit: string;
  unitName: string;
}

export interface ICharacterList {
  id: number;
  resourceId: number;
  firstName: string;
  givenName: string;
  gender: string;
  height: number;
  live2dHeightAdjustment: number;
  figure: string;
  breastSize: string;
  unit: string;
  supportUnitType: string;
  fullName?: string;
}

export interface IRariteisList {
  cardRarityType: string;
  seq: number;
  maxLevel: number;
  maxSkillLevel: number;
}

export interface IType {
  type: string;
}