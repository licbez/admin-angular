import { GENDER, ITrainer, ROLES, USER_STATUS } from 'src/services/api/api-app/app-user-api/user.interface';

export const EMPTY_USER: ITrainer = {
  _id: '',
  certified: false,
  phone: '',
  status: USER_STATUS.PENDING,
  avatar: '',
  about: '',
  role: ROLES.TRAINER,
  photos: [],
  certificates: [],
  additional: {
    gender: GENDER.MALE,
    name: '',
    birthday: Date.now(),
    email: '',
  },
};
