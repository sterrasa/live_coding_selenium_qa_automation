import { By, until } from 'selenium-webdriver';
import { getDriver } from './helpers';

describe('Test form', () => {
  let driver;

  beforeAll(() => {
    driver = getDriver();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('Should send form successfully', async () => {
    // Open the page
    await driver.get('http://localhost:3000');

    // Find fields in the form and complete them

    const inputName = await driver.findElement(By.id('name'));
    await inputName.sendKeys('Test Name');

    const inputEmail = await driver.findElement(By.id('email'));
    await inputEmail.sendKeys('test@test.com');

    const inputNumber = await driver.findElement(By.id('num'));
    await inputNumber.sendKeys('3');

    const inputPassword = await driver.findElement(By.id('password'));
    await inputPassword.sendKeys('test1234');

    const inputDescription = await driver.findElement(By.id('description'));
    await inputDescription.sendKeys('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam a massa condimentum consequat. Integer nec risus dolor.');

    const submitButton = await driver.findElement(By.id('submit'));
    await submitButton.click();

    // Slow down page load to see the form submission
    await driver.manage().setTimeouts({ pageLoad: 5000 });

    // Wait until the success message is displayed on the page
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Form has been submitted successfully')]")),
      5000
    );

    // Check the result
    const successMessage = await driver.findElement(By.xpath("//*[contains(text(), 'Form has been submitted successfully')]"));
    const messageText = await successMessage.getText();
    expect(messageText).toBe('Form has been submitted successfully');
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

  it('Should display "Invalid" message for incorrect email format', async () => {
    // Open the page
    await driver.get('http://localhost:3000');

    // Find the email field and enter an invalid email format
    const inputEmail = await driver.findElement(By.id('email'));
    await inputEmail.sendKeys('invalidemail');

    // Submit the form
    const submitButton = await driver.findElement(By.id('submit'));
    await submitButton.click();

    // Wait for the error message to be displayed
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Invalid')]")),
      5000
    );

    // Check the error message
    const errorMessage = await driver.findElement(By.xpath("//*[contains(text(), 'Invalid')]"));
    const messageText = await errorMessage.getText();
    expect(messageText).toBe('Invalid');
  });

  it('Should display error message for exceeding character limit in name field', async () => {
    // Open the page
    await driver.get('http://localhost:3000');
  
    // Find the name field and enter a value exceeding the character limit
    const inputName = await driver.findElement(By.id('name'));
    const longName = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam a massa condimentum consequat. Integer nec risus dolor.';
    await inputName.sendKeys(longName);
  
    // Submit the form
    const submitButton = await driver.findElement(By.id('submit'));
    await submitButton.click();
  
    // Wait for the error message to be displayed
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'The name field exceeds the character limit')]")),
      5000
    );
  
    // Check the error message
    const errorMessage = await driver.findElement(By.xpath("//*[contains(text(), 'The name field exceeds the character limit')]"));
    const messageText = await errorMessage.getText();
    expect(messageText).toBe('The name field exceeds the character limit');
  });

});
