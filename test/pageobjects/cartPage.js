import commonClass from "./commonClass";
import homePage from "./homePage";

class Cart extends commonClass{

    constructor(){
        super()

        this.$title = ()=> $(`//span[text()="Your Cart"]`)
        this.$cartIcon = () => $(`.shopping_cart_link`);
        this.$cartItemNames = ()=>$$(`//div[@class="inventory_item_name"]`)
        this.$itemPrice = ()=> $$(`//div[@class="inventory_item_price"]`)
        this.$checkoutBtn = ()=>$(`//button[@id="checkout"]`)
    }


    /**
     * verify if a product is in cart
     * @param {string} productName 
     * @returns 
     */
    async isProductInCart(productName) {
        const elements = await this.$cartItemNames();
        for (const el of elements) {
            if ((await el.getText()) === productName) {
                return true;
            }
        }
            return false;
    }

    

    /**
     * validate price of the product is same in homepage and in the cart
     * @param {string} productName 
     * @returns boolean 
     */

    async validatePrice(productName) {

    
    // await expectedPriceElement.waitForExist({
    //     timeout: 5000,
    //     timeoutMsg: `Price for ${productName} not found in cart`
    // });

    const expectedPrice = homePage.getProductStoredPrice(productName);
    


    const cartPrices = await this.$itemPrice();
    for (const price of cartPrices) {
        const text = await price.getText();
        if (text === expectedPrice) {
            return true;
        }
    }
    return false;
}


}

export default new Cart()