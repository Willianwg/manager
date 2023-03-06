import { IPasswordEncoder } from "../domain/contracts/passwordEncoder";
import * as bcrypt from "bcrypt";

export class PasswordEncoder implements IPasswordEncoder {
    private encoder = bcrypt;

    encode(password: string): string {
        return this.encoder.hashSync(password, 10);
    }

    match(raw: string, encoded: string): boolean {
        return this.encoder.compareSync(raw, encoded);
    }
}