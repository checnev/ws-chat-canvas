import { Color } from 'constants/colors';

export interface IUser {
  name: string;
  color: Color;
  id?: string;
}

class User implements IUser {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public color: Color
  ) {}
  
}

export default User;
