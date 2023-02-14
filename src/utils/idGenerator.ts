import { randomUUID } from "crypto";

export interface IdGeneratorInterface {
    generate(): string;
}

export class IdGenerator implements IdGeneratorInterface {
    generate(){
        return randomUUID();
    }
}
