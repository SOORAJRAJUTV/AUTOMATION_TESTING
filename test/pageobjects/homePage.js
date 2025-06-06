import commonClass from "./commonClass";

class HomePage extends commonClass{
    constructor(){
        super()

        this.totalPrice = 0; // initialize total price
        this.productPrices = {}; 

        this.$productHeader = ()=>$(`//span[text()="Products"]`)
        this.$addToCartBtn = (productName) => $(`//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button[contains(text(), 'Add to cart')]`);
                                                //div[ text()='Sauce Labs Backpack' ]/../../following-sibling::div//button[text()="Add to cart"]
        this.$removeBtn = (productName)=>$(`//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button[text()='Remove']`);
        this.$badge = ()=>$(`//span[@class="shopping_cart_badge"]`)
        this.$itemPriceHomepage = (productName) => $(`//div[text()='${productName}']/ancestor::div[@class='inventory_item_label']/following-sibling::div/div`)
                                                    //div[text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item_label']/following-sibling::div/div
    }
    

    /**
     * Add a product to cart based on the product name
     * @param {string} productName 
     * @returns 
     */

    async addToCart(productName) {
    const button = this.$addToCartBtn(productName);

        await button.waitForDisplayed({ timeout: 5000 });
        await button.scrollIntoView(); 
        await button.waitForClickable({ timeout: 5000 });
        

        const priceText = await this.$itemPriceHomepage(productName).getText(); // "$29.99"
        const numericPrice = parseFloat(priceText.replace('$', ''));

        this.totalPrice += numericPrice;
        await button.click();

        return await this.$removeBtn(productName).isExisting();

        // return await browser.waitUntil(async () => {
        //     return await this.$removeBtn(productName).isExisting();
        // }, 
        // {
        //     timeout: 5000,
        //     timeoutMsg: 'Remove Button has not loaded'
        // });

    }
    
    /**
     * Remove a product from cart
     * @param {string} productName 
     */
    
    async removeFromCart(productName){

        const priceText = await this.$itemPriceHomepage(productName).getText(); // "$15.99"
        const numericPrice = parseFloat(priceText.replace('$', ''));

        this.totalPrice -= numericPrice;

        await this.$removeBtn(productName).click()
    }

    
    /**
     * Get the price of a product
     * @param {string} productName 
     * @returns price text
     */
    async getProductPrice(productName) {
        const priceElement = this.$itemPriceHomepage(productName);

        await priceElement.waitForExist({
            timeout: 5000,
            timeoutMsg: `Price for ${productName} not found on homepage`
        });

        const priceText = await priceElement.getText(); // e.g., "$29.99"
        this.productPrices[productName]=priceText
        return priceText;
   }

   /**
    * Get the total price
    * @returns total price
    */

    async getTotalPrice() {
    return this.totalPrice;
    }
    
    

    getProductStoredPrice(productName) {
    return this.productPrices[productName]; // e.g., "$29.99"
}




}

export default new HomePage()