import login from '../pageobjects/loginPage'

describe("Saucedemo Swag labs E2E automation",()=>{

    it("should launch the application",async()=>{
        await login.open('https://www.saucedemo.com/')
        expect(await login.$title().getText()).toEqual('Swag Labs')
    })


})