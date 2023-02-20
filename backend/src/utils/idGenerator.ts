import { randomUUID } from "crypto";
import { IdGeneratorInterface } from "../domain/contracts/IdGenerator";

export class IdGenerator implements IdGeneratorInterface {
    generate(){
        return randomUUID();
    }
}
