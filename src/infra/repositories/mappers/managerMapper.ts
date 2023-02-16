import { Manager } from "../../../entities/manager";
import { Manager as RawManager } from "@prisma/client";

export class PrismaManagerMapper {
    static toPrisma(manager: Manager){
        return {
            id: manager.id,
            name: manager.name,
            email: manager.email,
            password: manager.password
        }
    }

    static toDomain(manager: RawManager){
        return new Manager({
            name: manager.name,
            email: manager.email,
            password: ""
        }, manager.id)
    }
}