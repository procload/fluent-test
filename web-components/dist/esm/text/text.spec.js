import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
test.describe('Text Component', () => {
    let page;
    let element;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        element = page.locator('fluent-text');
        await page.goto(fixtureURL('components-text--text'));
    });
    test.afterAll(async () => {
        await page.close();
    });
    const sizeAttributes = {
        _100: '100',
        _200: '200',
        _300: '300',
        _400: '400',
        _500: '500',
        _600: '600',
        _700: '700',
        _800: '800',
        _900: '900',
        _1000: '1000',
    };
    const weightAttributes = {
        medium: 'medium',
        regular: 'regular',
        semibold: 'semibold',
        bold: 'bold',
    };
    const alignAttributes = {
        start: 'start',
        end: 'end',
        center: 'center',
        justify: 'justify',
    };
    const fontAttributes = {
        base: 'base',
        numeric: 'numeric',
        monospace: 'monospace',
    };
    test('should render without crashing', async () => {
        await page.waitForSelector('fluent-text');
        await expect(element).toBeVisible();
    });
    test(`should set and reflect and update the nowrap attribute and property on the internal control`, async () => {
        await element.evaluate((node) => {
            node.nowrap = true;
        });
        await expect(element).toHaveAttribute('nowrap', '');
        await expect(element).toHaveJSProperty('nowrap', true);
        await element.evaluate((node) => {
            node.nowrap = false;
        });
        await expect(element).not.toHaveAttribute('nowrap', '');
        await expect(element).toHaveJSProperty('nowrap', false);
    });
    test(`should set and reflect and update the truncate attribute and property on the internal control`, async () => {
        await element.evaluate((node) => {
            node.truncate = true;
        });
        await expect(element).toHaveAttribute('truncate', '');
        await expect(element).toHaveJSProperty('truncate', true);
        await element.evaluate((node) => {
            node.truncate = false;
        });
        await expect(element).not.toHaveAttribute('truncate', '');
        await expect(element).toHaveJSProperty('truncate', false);
    });
    test(`should set and reflect and update the italic attribute and property on the internal control`, async () => {
        await element.evaluate((node) => {
            node.italic = true;
        });
        await expect(element).toHaveAttribute('italic', '');
        await expect(element).toHaveJSProperty('italic', true);
        await element.evaluate((node) => {
            node.italic = false;
        });
        await expect(element).not.toHaveAttribute('italic', '');
        await expect(element).toHaveJSProperty('italic', false);
    });
    test(`should set and reflect and update the underline attribute and property on the internal control`, async () => {
        await element.evaluate((node) => {
            node.underline = true;
        });
        await expect(element).toHaveAttribute('underline', '');
        await expect(element).toHaveJSProperty('underline', true);
        await element.evaluate((node) => {
            node.underline = false;
        });
        await expect(element).not.toHaveAttribute('underline', '');
        await expect(element).toHaveJSProperty('underline', false);
    });
    test(`should set and reflect and update the strikethrough attribute and property on the internal control`, async () => {
        await element.evaluate((node) => {
            node.strikethrough = true;
        });
        await expect(element).toHaveAttribute('strikethrough', '');
        await expect(element).toHaveJSProperty('strikethrough', true);
        await element.evaluate((node) => {
            node.strikethrough = false;
        });
        await expect(element).not.toHaveAttribute('strikethrough', '');
        await expect(element).toHaveJSProperty('strikethrough', false);
    });
    test(`should set and reflect and update the block attribute and property on the internal control`, async () => {
        await element.evaluate((node) => {
            node.block = true;
        });
        await expect(element).toHaveAttribute('block', '');
        await expect(element).toHaveJSProperty('block', true);
        await element.evaluate((node) => {
            node.block = false;
        });
        await expect(element).not.toHaveAttribute('block', '');
        await expect(element).toHaveJSProperty('block', false);
    });
    for (const [, value] of Object.entries(sizeAttributes)) {
        test(`should set and reflect the size attribute to \`${value}\` on the internal control`, async () => {
            await element.evaluate((node, sizeValue) => {
                node.size = sizeValue;
            }, value);
            await expect(element).toHaveJSProperty('size', `${value}`);
            await expect(element).toHaveAttribute('size', `${value}`);
        });
    }
    for (const [, value] of Object.entries(weightAttributes)) {
        test(`should set and reflect the weight attribute to \`${value}\` on the internal control`, async () => {
            await element.evaluate((node, weightValue) => {
                node.weight = weightValue;
            }, value);
            await expect(element).toHaveJSProperty('weight', `${value}`);
            await expect(element).toHaveAttribute('weight', `${value}`);
        });
    }
    for (const [, value] of Object.entries(alignAttributes)) {
        test(`should set and reflect the align attribute to \`${value}\` on the internal control`, async () => {
            await element.evaluate((node, alignValue) => {
                node.align = alignValue;
            }, value);
            await expect(element).toHaveJSProperty('align', `${value}`);
            await expect(element).toHaveAttribute('align', `${value}`);
        });
    }
    for (const [, value] of Object.entries(fontAttributes)) {
        test(`should set and reflect the font attribute to \`${value}\` on the internal control`, async () => {
            await element.evaluate((node, fontValue) => {
                node.font = fontValue;
            }, value);
            await expect(element).toHaveJSProperty('font', `${value}`);
            await expect(element).toHaveAttribute('font', `${value}`);
        });
    }
});
//# sourceMappingURL=text.spec.js.map