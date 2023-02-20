import { ManagerNotFound } from "../../src/domain/errors/managerNotFount";
import { GetManager } from "../../src/domain/useCases/getManager";
import { makeManager } from "../factories/makeManager";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";

// https://mystore.com/:manager-short-id/:productname/:seller_id

describe("Get Manager", () => {
    it("Should be able to find a Manager", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const getManager = new GetManager(managerRepository);

        const newManager = makeManager();
        managerRepository.create(newManager);

        const { manager } = await getManager.execute({
            id: newManager.id,
        });

        expect(manager).toEqual(newManager);
    })

    it("Should not be able to find a Manager using wrong manager id", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const getManager = new GetManager(managerRepository);

        expect( 
            getManager.execute({
                id: "somewrongid",
            })
        ).rejects.toThrow(ManagerNotFound);
    })
})