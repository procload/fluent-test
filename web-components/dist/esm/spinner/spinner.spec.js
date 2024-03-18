import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
test.describe('Spinner', () => {
    let page;
    let element;
    let root;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        element = page.locator('fluent-spinner');
        root = page.locator('#root');
        await page.goto(fixtureURL('components-spinner--spinner'));
    });
    test.afterAll(async () => {
        await page.close();
    });
    // Foundation tests
    test('should include a role of progressbar', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
            <fluent-spinner></fluent-spinner>
        `;
        });
        await expect(element).toHaveAttribute('role', 'progressbar');
    });
    // Fluent Specific property tests
    test('should set and retrieve the `appearance` property correctly to primary', async () => {
        await element.evaluate((node) => {
            node.appearance = 'primary';
        });
        await expect(element).toHaveJSProperty('appearance', 'primary');
    });
    test('should set and retrieve the `appearance` property correctly to inverted', async () => {
        await element.evaluate((node) => {
            node.appearance = 'inverted';
        });
        await expect(element).toHaveJSProperty('appearance', 'inverted');
    });
    test('should set and retrieve the `size` property correctly to tiny', async () => {
        await element.evaluate((node) => {
            node.size = 'tiny';
        });
        await expect(element).toHaveJSProperty('size', 'tiny');
    });
    test('should set and retrieve the `size` property correctly to small', async () => {
        await element.evaluate((node) => {
            node.size = 'small';
        });
        await expect(element).toHaveJSProperty('size', 'small');
    });
    test('should set and retrieve the `size` property correctly to medium', async () => {
        await element.evaluate((node) => {
            node.size = 'medium';
        });
        await expect(element).toHaveJSProperty('size', 'medium');
    });
    test('should set and retrieve the `size` property correctly to large', async () => {
        await element.evaluate((node) => {
            node.size = 'large';
        });
        await expect(element).toHaveJSProperty('size', 'large');
    });
    test('should set and retrieve the `size` property correctly to extra-large', async () => {
        await element.evaluate((node) => {
            node.size = 'extra-large';
        });
        await expect(element).toHaveJSProperty('size', 'extra-large');
    });
    test('should set and retrieve the `size` property correctly to huge', async () => {
        await element.evaluate((node) => {
            node.size = 'huge';
        });
        await expect(element).toHaveJSProperty('size', 'huge');
    });
});
//# sourceMappingURL=spinner.spec.js.map