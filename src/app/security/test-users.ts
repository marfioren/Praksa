import { UserAuth } from "./user-auth";
import {Observable} from 'rxjs';
export const LOGIN_MOCKS: UserAuth[] = [
  {
    Username: "testniUser",
    Password: "testnipass1",
    isAuthenticated: true,
    Mail: "test@mail.com",
    isMailConfirmed: true
  },
  {
    Username: "testniUser2",
    Password: "testnipass2",
    isAuthenticated: true,
    Mail: "test@mail.com",
    isMailConfirmed: true
  }
];

