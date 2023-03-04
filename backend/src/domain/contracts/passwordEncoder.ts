
export interface IPasswordEncoder {
    encode(password: string): string;
    match(raw: string, encoded: string): boolean;
}