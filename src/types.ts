
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: City;
  phone: string;
  website: string;
  company: Company;
  comment?: string;

}
export type City = {
  street: string,
  city: string,
  zipcode: string
}
export type Company = {
  name: string,
}

