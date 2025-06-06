import commonClass from "./commonClass";

class login extends commonClass{
    constructor(){
        super()

        this.$title = ()=> $(`//div[@class="login_logo"]`)
        this.$username = ()=>$(`//input[@id="user-name"]`)
        this.$password = ()=>$(`//input[@id="password"]`)
        this.$loginButton = ()=>$(`//input[@id="login-button"]`)
       
      

    }
    /**
     * login to Swag Labs website
     * @param {string} username 
     * @param {string} password 
     */
    async loginSwag(username,password){
        await this.$username().setValue(username)
        await this.$password().setValue(password)
        await this.$loginButton().click()

    }



}

export default new login()