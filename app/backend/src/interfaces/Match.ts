export interface IMatch {
  'id': number,
  'homeTeamId': number,
  'homeTeamGoals': number,
  'awayTeamId': number,
  'awayTeamGoals': number,
  'inProgress': boolean,
  'homeTeam': {
    'teamName': string
  },
  'awayTeam': {
    'teamName': string
  }
}

export interface IUpdateMatch {
  'awayTeamGoals': number,
  'homeTeamGoals': number
}

export interface ICreateMatch {
  'homeTeamId': number,
  'awayTeamId': number,
  'homeTeamGoals': number,
  'awayTeamGoals': number,
  'inProgress'?: boolean
}
