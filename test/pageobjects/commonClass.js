export default class commonClass{

  /**
   * launch the website
   * @param {string} url 
   * @returns 
   */

    async open(url){
      return browser.url(url)
      
    }
}