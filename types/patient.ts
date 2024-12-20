export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  age: number;
  mobile: string;
  address?: string;
  conditions: string[];
  nextAppointment: string;
  joinedDate: string;
};
