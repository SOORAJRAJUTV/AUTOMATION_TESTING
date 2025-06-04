import commonClass from "./commonClass";

class login extends commonClass{
    constructor(){
        super()

        this.$title = ()=> $(`//div[@class="login_logo"]`)


    }
}

export default new login()