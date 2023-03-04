import { IPasswordEncoder } from "../../src/domain/contracts/passwordEncoder";

export class FakeEncoder implements IPasswordEncoder {
    encode(password: string): string {
        return password;
    }

    match(raw: string, encoded: string): boolean {
        return raw === encoded ? true : false;
    }
}
