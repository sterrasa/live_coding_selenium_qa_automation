import {getDriver} from './helpers';
import {By, until} from 'selenium-webdriver';

describe('Example test suit', () => {
  let driver;

  beforeAll(() => {
    driver = getDriver();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should have a title', async  () => {
    await driver.get('http://localhost:3000');
    await driver.wait(until.titleIs('React Selenium App'), 5000);
  });

  it('Should display "Min 6 characters" message for short password', async () => {
    // Open the page
    await driver.get('http://localhost:3000');

    // Find the password field and enter a short password
    const inputPassword = await driver.findElement(By.id('password'));
    await inputPassword.sendKeys('short');

    // Submit the form
    const submitButton = await driver.findElement(By.id('submit'));
    await submitButton.click();

     // Slow down page load to see the form submission
     await driver.manage().setTimeouts({ pageLoad: 5000 });

    // Wait for the error message to be displayed
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'min 6 characters')]")),
      5000
    );

    // Check the error message
    const errorMessage = await driver.findElement(By.xpath("//*[contains(text(), 'min 6 characters')]"));
    const messageText = await errorMessage.getText();
    expect(messageText).toBe('min 6 characters');
  });
});