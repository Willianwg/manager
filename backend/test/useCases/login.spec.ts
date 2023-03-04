import { InvalidPassword } from "../../src/domain/errors/invalidPassword";
import { ManagerNotFound } from "../../src/domain/errors/managerNotFound";
import { ManagerLogin } from "../../src/domain/useCases/managerLogin";
import { makeManager } from "../factories/makeManager";
import { InMemoryManagerRepository } from "../inMemoryDB/manager";
import { FakeEncoder } from "../utils/fakePasswordEncoder";

describe("Manager Login", () => {
    it("Should be able to login", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const passwordEncoder = new FakeEncoder();
        const managerLogin = new ManagerLogin(managerRepository, passwordEncoder);

        const newManager = makeManager( {
            email: "logintest@example.com",
            password: "12345"
        });

        managerRepository.create(newManager);

        const { manager } = await managerLogin.execute({
            email: "logintest@example.com",
            password: "12345"
        });

        expect(manager).toEqual(newManager);
    })

    it("Should not be able to login using wrong email", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const passwordEncoder = new FakeEncoder();
        const managerLogin = new ManagerLogin(managerRepository, passwordEncoder);

        const newManager = makeManager( {
            email: "logintest@example.com",
            password: "12345"
        });

        managerRepository.create(newManager);

        expect( 
            managerLogin.execute({
                email: "wrong@example.com",
                password: "12345"
            })
        ).rejects.toThrow(ManagerNotFound);
    })

    it("Should not be able to login using wrong password", async () => {
        const managerRepository = new InMemoryManagerRepository();
        const passwordEncoder = new FakeEncoder();
        const managerLogin = new ManagerLogin(managerRepository, passwordEncoder);

        const newManager = makeManager( {
            email: "logintest@example.com",
            password: "12345"
        });

        managerRepository.create(newManager);

        expect( 
            managerLogin.execute({
                email: "logintest@example.com",
                password: "wrong-password"
            })
        ).rejects.toThrow(InvalidPassword);
    })
})