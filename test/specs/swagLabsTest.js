import login from '../pageobjects/loginPage'
import homePage from '../pageobjects/homePage'
import cart from '../pageobjects/cartPage'
import checkout from '../pageobjects/checkoutPage'
import checkoutOverview from '../pageobjects/checkoutOverviewPage'
import checkoutOverviewPage from '../pageobjects/checkoutOverviewPage'

describe("Saucedemo Swag labs E2E automation",()=>{

    const prod1 = 'Sauce Labs Backpack'
    const prod2 = 'Sauce Labs Bike Light'

    it("should launch the application",async()=>{
        await login.open('https://www.saucedemo.com/')
        expect(await login.$title().getText()).toEqual('Swag Labs')
    })

    it("should login successfully",async()=>{
        await login.loginSwag('standard_user','secret_sauce')
        expect(homePage.$productHeader()).toBeDisplayed()
        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

    })

    it("Should add items to cart successfully",async()=>{

        await homePage.addToCart('Sauce Labs Backpack');
        expect(await homePage.$removeBtn('Sauce Labs Backpack')).toBeDisplayed()

    })

    it("verify shopping cart badge is updating according to number of products",async()=>{
        expect(Number(await homePage.$badge().getText())).toEqual(1)

    })

    it("verify shopping cart badge is updating for product 2",async()=>{
        await homePage.addToCart('Sauce Labs Bike Light');
        expect(Number(await homePage.$badge().getText())).toEqual(2)

    })

    it("verify shopping cart badge is updating for product 3",async()=>{
        await homePage.addToCart('Sauce Labs Bolt T-Shirt');
        expect(Number(await homePage.$badge().getText())).toEqual(3)

    })

    it("should remove a product and verify Add to Cart button is displayed",async()=>{
        await homePage.removeFromCart('Sauce Labs Bolt T-Shirt');
        expect(await homePage.$addToCartBtn('Sauce Labs Bolt T-Shirt')).toBeDisplayed()

    })

    it("verify shopping cart badge is updating to 2",async()=>{
        expect(Number(await homePage.$badge().getText())).toEqual(2)
    }) 


    //cart

    it("should validate Cart page is loaded",async()=>{
        await cart.$cartIcon().waitForDisplayed({ timeout: 5000 });
        await cart.$cartIcon().click();
        expect(await cart.$title()).toBeDisplayed()
    })

    it("Validate same product is added to the cart",()=>{
        expect(cart.isProductInCart('Sauce Labs Backpack')).toBeTruthy()
        expect(cart.isProductInCart('Sauce Labs Bike Light')).toBeTruthy()
    })

    it('Validate price of each product',async()=>{
        expect(cart.validatePrice('Sauce Labs Backpack')).toBeTruthy()

        expect(cart.validatePrice('Sauce Labs Bike Light')).toBeTruthy()
    })
   
    it("should checkout the cart", async()=>{
        await cart.$checkoutBtn().waitForDisplayed({ timeout: 5000 });
        await cart.$checkoutBtn().click()
        expect(await checkout.$checkoutTitle()).toBeDisplayed()

    })

    it("should verify error message is shown",async()=>{
        await checkout.$continueBtn().click()
        expect(await checkout.$errorMsg()).toBeDisplayed()
    })

    it("should fill the form and submit",async()=>{
        await checkout.fillForm()
        expect(await checkoutOverview.$checkoutOverviewTitle()).toBeDisplayed()
    })



    it("should validate total price during checkout", async () => {
    const expectedTotal = await homePage.getTotalPrice();

    const actualTotalText = await checkoutOverview.$totalPrice().getText(); // "Total: $49.98"
    const actualTotal = parseFloat(actualTotalText.replace('Item total: $', ''));

    //expect(actualTotal).toBeCloseTo(expectedTotal, 2); // allow float rounding
    expect(actualTotal).toEqual(expectedTotal)
    });

    
    it("should validate same product is in checkout page",async()=>{
      expect(await checkoutOverviewPage.$item1().getText()).toEqual(prod1)
      expect(await checkoutOverviewPage.$item2().getText()).toEqual(prod2)
    })
    

    it("should click finish and verify header",async()=>{
        await checkoutOverview.$finishBtn().click()
        expect(await checkoutOverview.$orderTitle()).toBeDisplayed()
    })

    it("should verify successful order message",async()=>{
        
        expect(await checkoutOverview.$confirmOrderMsg()).toBeDisplayed()
        expect(await checkoutOverview.$confirmOrderMsg().getText()).toEqual('Thank you for your order!')
    })



})