import commonClass from "./commonClass";


class CheckoutOverview extends commonClass{
    constructor(){
        super()


        this.$checkoutOverviewTitle = ()=>$(`//span[text()="Checkout: Overview"]`)
        this.$totalPrice = ()=>$(`.summary_subtotal_label`)
        this.$finishBtn = ()=>$(`//button[@id="finish"]`)
        this.$orderTitle = ()=>$(`//span[text()="Checkout: Complete!"]`)
        this.$confirmOrderMsg = ()=>$('//h2[@class="complete-header"]')

        this.$item1 = ()=>$(`//div[text()="Sauce Labs Backpack"]`)
        this.$item2 = ()=>$(`//div[text()="Sauce Labs Bike Light"]`)






    }     
    
    
}

export default new CheckoutOverview()