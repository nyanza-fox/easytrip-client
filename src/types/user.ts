export type User = {
  _id: string;
  role: 'admin' | 'user';
  email: string;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
};

export type Profile = {
  firstName: string;
  lastName?: string;
  image?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
};

export type UserInput = Pick<User, 'email' | 'profile'> & { password: string };
