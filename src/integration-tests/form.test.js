import { By, until } from 'selenium-webdriver';
import { getDriver } from './helpers';
import { getTomorrowDate } from '../utils';

describe('Test form', () => {
  let driver;

  beforeAll(() => {
    driver = getDriver();
  });

  afterAll(async () => {
    await driver.quit();
  });

  // Helper method to open the page
  const openPage = async () => {
    await driver.get('http://localhost:3000');
  };

  // Helper method to find an element and type text into it
  const findAndType = async (elementId, text) => {
    const inputElement = await driver.findElement(By.id(elementId));
    await inputElement.sendKeys(text);
  };

  // Helper method to click the submit button
  const clickSubmitButton = async () => {
    const submitButton = await driver.findElement(By.id('submit'));
    await submitButton.click();
  };

  // Helper method to wait for an error message to be displayed and check its text
  const waitAndCheckErrorMessage = async (expectedErrorMessage) => {
    await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), '${expectedErrorMessage}')]`)), 5000);
    const errorMessage = await driver.findElement(By.xpath(`//*[contains(text(), '${expectedErrorMessage}')]`));
    const messageText = await errorMessage.getText();
    expect(messageText).toBe(expectedErrorMessage);
  };

  it('Should send form successfully', async () => {
    await openPage();

    await findAndType('name', 'Test Name');
    await findAndType('email', 'test@test.com');
    await findAndType('birthdate','26/03/1987');
    await findAndType('password', 'test1234');
    await findAndType('num', '3');
    await findAndType('description', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam a massa condimentum consequat. Integer nec risus dolor.');

    await clickSubmitButton();

    await driver.manage().setTimeouts({ pageLoad: 5000 });

    await waitAndCheckErrorMessage('Form has been submitted successfully');
  });

  it('Should display "Min 6 characters" message for short password', async () => {
    await openPage();

    await findAndType('password', 'short');
    await clickSubmitButton();

    await waitAndCheckErrorMessage('min 6 characters');
  });

  it('Should display "Invalid" message for incorrect email format', async () => {
    await openPage();

    await findAndType('email', 'invalidemail');
    await clickSubmitButton();

    await waitAndCheckErrorMessage('Invalid');
  });

  it('Should display error message for exceeding character limit in name field', async () => {
    await openPage();

    const longName = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam a massa condimentum consequat. Integer nec risus dolor.';
    await findAndType('name', longName);
    await clickSubmitButton();

    await waitAndCheckErrorMessage('The name field exceeds the character limit');
  });

  it('Should display error message for birthdate when date is > than today', async () => {
    await openPage();

    const tomorrow = getTomorrowDate()
    await findAndType('birthdate', tomorrow);
    await clickSubmitButton();
    await waitAndCheckErrorMessage('The birth date must be earlier than today.');
  });
  
});
