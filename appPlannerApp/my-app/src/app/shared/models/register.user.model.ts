import { AddressModel} from "./address.model";

export class RegisterUserModel {
  constructor(
    public username: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public address: [
      AddressModel
      ],
  ) {}
}


