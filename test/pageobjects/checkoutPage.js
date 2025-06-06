import commonClass from "./commonClass";


class Checkout extends commonClass{
    constructor(){
        super()


        this.$checkoutTitle = ()=>$(`//div[@class="header_secondary_container"]/child::span[text()="Checkout: Your Information"]`)
        this.$errorMsg = ()=>$(`//div[@class="error-message-container error"]/h3[@data-test="error"]`)
        this.$continueBtn = ()=>$(`#continue`)

        this.$firstName = ()=>$(`//input[@id="first-name"]`)
        this.$lastName = ()=>$(`//input[@id="last-name"]`)
        this.$postalCode = ()=>$(`//input[@id="postal-code"]`)

       
    }
    

    /**
     *  fill the form in checkout page
     */
    async fillForm(){
        await this.$firstName().setValue('John')
        await this.$lastName().setValue('Thomas')
        await this.$postalCode().setValue('675467')

        await this.$continueBtn().click()
    }
}

export default new Checkout()