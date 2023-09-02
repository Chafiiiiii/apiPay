import {Deserializable} from "./deserializable.model";

export class Aeropuerto implements Deserializable{

  public _id: string;
  public Ciudad: string;
  public Pais: string;
  public nombreAeropuerto: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}
