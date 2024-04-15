export class Kid {
  id: string;
  fullName: any;
  emailAddress: string;
  age: number;
  gender: string;
  zipcode: number;

  constructor(
    id: string,
    fullName: string,
    emailAddress: string,
    age: number,
    gender: string,
    zipcode: number
  ) {
    this.id = id;
    this.fullName = fullName;
    this.emailAddress = emailAddress;
    this.age = age;
    this.gender = gender;
    this.zipcode = zipcode;
  }
}
