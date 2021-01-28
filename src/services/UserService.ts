import type { IUser } from 'lib/user/User';

class UserService {
  static getAll(): Promise<IUser[]> {
    return fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users`,
      {
        mode: 'cors',
      }
    )
    .then((res) => res.json()); 
  }
}

export default UserService;
