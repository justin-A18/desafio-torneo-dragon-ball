import { IFighterInstance } from "../entities/fighter/fighter.types";

export interface ITournament {
  fighters: IFighterInstance[];
  rounds: TRound[];
  champion: IFighterInstance | null;
}

export type TRound = TBattle[];

type TBattle = {
  fighter1: IFighterInstance;
  fighter2: IFighterInstance;
  turns: TTurn[];
  winner: IFighterInstance | null;
};

export type TTurn = {
  attacker: IFighterInstance;
  receiver: IFighterInstance;
  damage: number;
  evaded: boolean;
  healthLeft?: number;
};
