import { CreateManager } from "../../src/useCases/createManager";
import { IdGenerator } from "../../src/utils/idGenerator";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";

// https://mystore.com/:manager-short-id/:productname/:seller_id

describe("Create Manager", () => {
    it("Should be able to create a Manager", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const idGenerator = new IdGenerator();
        const createManager = new CreateManager(managerRepository, idGenerator);

        const { manager } = await createManager.execute({
            email: "manager@email.com",
            name: "manager name",
            password: "lskdajfa",
        })

        expect(managerRepository.managers).toHaveLength(1);
        expect(managerRepository.managers[0]).toEqual(manager);
    })
})