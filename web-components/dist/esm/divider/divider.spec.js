import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
test.describe('Divider', () => {
    let page;
    let element;
    let root;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(fixtureURL('components-divider--divider'));
        element = page.locator('fluent-divider');
        root = page.locator('#root');
    });
    test.afterAll(async () => {
        await page.close();
    });
    test('should set a default `role` attribute of "separator"', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fluent-divider></fluent-divider>
            `;
        });
        await expect(element).toHaveAttribute('role', 'separator');
    });
    test('should set the `role` attribute equal to the role provided', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fluent-divider role="presentation"></fluent-divider>
            `;
        });
        await expect(element).toHaveAttribute('role', 'presentation');
        await element.evaluate((node) => {
            node.role = 'separator';
        });
        await expect(element).toHaveAttribute('role', 'separator');
    });
    test('should set the `aria-orientation` attribute equal to the `orientation` value', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fluent-divider orientation="vertical"></fluent-divider>
            `;
        });
        await expect(element).toHaveAttribute('aria-orientation', 'vertical');
        await element.evaluate((node) => {
            node.orientation = 'horizontal';
        });
        await expect(element).toHaveAttribute('aria-orientation', 'horizontal');
    });
    test('should NOT set the `aria-orientation` property equal to `orientation` value if the `role` is presentational', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
                <fluent-divider orientation="vertical"></fluent-divider>
            `;
        });
        await expect(element).toHaveAttribute('aria-orientation', 'vertical');
        await element.evaluate((node) => {
            node.role = 'presentation';
        });
        await expect(element).not.toHaveJSProperty('aria-orientation', 'vertical');
        await expect(element).not.toHaveJSProperty('aria-orientation', 'horizontal');
    });
    test('should initialize to the provided value attribute if set post-connection', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
              <fluent-divider></fluent-divider>
          `;
        });
        await element.evaluate((node) => {
            node.alignContent = 'start';
        });
        await expect(element).toHaveJSProperty('alignContent', 'start');
        await element.evaluate((node) => {
            node.alignContent = 'center';
        });
        await expect(element).toHaveJSProperty('alignContent', 'center');
        await element.evaluate((node) => {
            node.alignContent = 'end';
        });
        await expect(element).toHaveJSProperty('alignContent', 'end');
        await element.evaluate((node) => {
            node.appearance = 'default';
        });
        await expect(element).toHaveJSProperty('appearance', 'default');
        await element.evaluate((node) => {
            node.appearance = 'strong';
        });
        await expect(element).toHaveJSProperty('appearance', 'strong');
        await element.evaluate((node) => {
            node.appearance = 'brand';
        });
        await expect(element).toHaveJSProperty('appearance', 'brand');
        await element.evaluate((node) => {
            node.appearance = 'subtle';
        });
        await expect(element).toHaveJSProperty('appearance', 'subtle');
        await element.evaluate((node) => {
            node.inset = true;
        });
        await expect(element).toHaveJSProperty('inset', true);
    });
});
//# sourceMappingURL=divider.spec.js.map