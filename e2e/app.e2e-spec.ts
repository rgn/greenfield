import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for greenfield-ui', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be greenfield-ui', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('greenfield-ui');
    })
  });

  it('navbar-brand should be greenfield-network@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('greenfield-network@0.0.1');
  });

  
    it('Idea component should be loadable',() => {
      page.navigateTo('/Idea');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Idea');
    });

    it('Idea table should have 9 columns',() => {
      page.navigateTo('/Idea');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });

  
    it('PersonalWallet component should be loadable',() => {
      page.navigateTo('/PersonalWallet');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('PersonalWallet');
    });

    it('PersonalWallet table should have 4 columns',() => {
      page.navigateTo('/PersonalWallet');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  

});
