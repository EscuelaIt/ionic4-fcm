import { Session } from './session.model';

export interface Group {
  time: string;
  sessions: Session[];
}
