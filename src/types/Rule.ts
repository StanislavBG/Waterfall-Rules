export interface Rule {
  id: string;
  name: string;
  description: string;
  children: Rule[];
  isOr: boolean;
}

export type RuleAction = 'add' | 'delete' | 'nest' | 'unNest'; 