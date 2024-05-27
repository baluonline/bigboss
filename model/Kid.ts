export class Kid {
  id: number;
  fullName: any;
  emailAddress: string;
  age: number;
  gender: string;
  zipcode: number;
  favoriteFood: string

  constructor(
    id: number,
    fullName: string,
    emailAddress: string,
    age: number,
    gender: string,
    zipcode: number,
    favoriteFood: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.emailAddress = emailAddress;
    this.age = age;
    this.gender = gender;
    this.zipcode = zipcode;
    this.favoriteFood = favoriteFood;
  }
}
