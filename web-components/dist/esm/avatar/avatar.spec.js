import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
test.describe('Avatar Component', () => {
    let page;
    let element;
    let root;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        element = page.locator('fluent-avatar');
        root = page.locator('#root');
        await page.goto(fixtureURL('components-avatar--avatar'));
    });
    test.afterAll(async () => {
        await page.close();
    });
    const colorAttributes = {
        neutral: 'neutral',
        brand: 'brand',
        colorful: 'colorful',
        darkRed: 'dark-red',
        cranberry: 'cranberry',
        red: 'red',
        pumpkin: 'pumpkin',
        peach: 'peach',
        marigold: 'marigold',
        gold: 'gold',
        brass: 'brass',
        brown: 'brown',
        forest: 'forest',
        seafoam: 'seafoam',
        darkGreen: 'dark-green',
        lightTeal: 'light-teal',
        teal: 'teal',
        steel: 'steel',
        blue: 'blue',
        royalBlue: 'royal-blue',
        cornflower: 'cornflower',
        navy: 'navy',
        lavender: 'lavender',
        purple: 'purple',
        grape: 'grape',
        lilac: 'lilac',
        pink: 'pink',
        magenta: 'magenta',
        plum: 'plum',
        beige: 'beige',
        mink: 'mink',
        platinum: 'platinum',
        anchor: 'anchor',
    };
    const appearanceAttributes = {
        ring: 'ring',
        shadow: 'shadow',
        ringShadow: 'ring-shadow',
    };
    const sizeAttributes = {
        _16: 16,
        _20: 20,
        _24: 24,
        _28: 28,
        _32: 32,
        _36: 36,
        _40: 40,
        _48: 48,
        _56: 56,
        _64: 64,
        _72: 72,
        _96: 96,
        _120: 120,
        _128: 128,
    };
    test('should render without crashing', async () => {
        await page.waitForSelector('fluent-avatar');
        await expect(element).toBeVisible();
    });
    test('When no name value is set, should render with custom initials based on the provided initials value', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
        <fluent-avatar initials="JD"></fluent-avatar>
      `;
        });
        await expect(element).toHaveText('JD');
    });
    test('When name value is set, should generate initials based on the provided name value', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
        <fluent-avatar name="John Doe"></fluent-avatar>
      `;
        });
        await expect(element).toHaveText('JD');
    });
    test('When name value and custom initials are set, should prioritize the provided initials', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
        <fluent-avatar name="Julie Wright" initials="JJ"></fluent-avatar>
      `;
        });
        await expect(element).toHaveText('JJ');
    });
    test('should render correctly in active state', async () => {
        await element.evaluate((node) => {
            node.active = 'active';
        });
        await expect(element).toHaveJSProperty('active', 'active');
    });
    test('should render correctly in inactive state', async () => {
        await element.evaluate((node) => {
            node.active = 'inactive';
        });
        await expect(element).toHaveJSProperty('active', 'inactive');
    });
    test('default color should be neutral', async () => {
        await expect(element).toHaveAttribute('data-color', `neutral`);
    });
    test('should default to a specific color when "colorful" is set without name or colorId', async () => {
        await element.evaluate((node) => {
            node.color = 'colorful';
        });
        const generatedColor = await element.evaluate((node) => {
            return node.generateColor();
        });
        await expect(element).toHaveAttribute('data-color', `${generatedColor}`);
    });
    test('should derive the color from the name attribute when set to "colorful"', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
        <fluent-avatar name="John Doe" color="colorful"></fluent-avatar>
      `;
        });
        const generatedColor = await element.evaluate((node) => {
            return node.generateColor();
        });
        await expect(element).toHaveAttribute('data-color', `${generatedColor}`);
    });
    test('should prioritize color derivation from colorId over name when set to "colorful"', async () => {
        await root.evaluate(node => {
            node.innerHTML = /* html */ `
        <fluent-avatar color-id="pumpkin" name="John Doe" color="colorful"></fluent-avatar>
      `;
        });
        const generatedColor = await element.evaluate((node) => {
            return node.generateColor();
        });
        await expect(element).toHaveAttribute('data-color', `${generatedColor}`);
    });
    for (const [, value] of Object.entries(colorAttributes)) {
        test(`should set the color attribute to \`${value}\` on the internal control`, async () => {
            await element.evaluate((node, colorValue) => {
                node.color = colorValue;
            }, value);
            await expect(element).toHaveJSProperty('color', `${value}`);
            await expect(element).toHaveAttribute('color', `${value}`);
        });
    }
    for (const [, value] of Object.entries(sizeAttributes)) {
        test(`should set the size attribute to \`${value}\` on the internal control`, async () => {
            await element.evaluate((node, sizeValue) => {
                node.size = sizeValue;
            }, value);
            await expect(element).toHaveJSProperty('size', value);
            await expect(element).toHaveAttribute('size', `${value}`);
        });
    }
    for (const [, value] of Object.entries(appearanceAttributes)) {
        test(`should set and reflect the appearance attribute to \`${value}\` on the internal control`, async () => {
            await element.evaluate((node, appearanceValue) => {
                node.appearance = appearanceValue;
            }, value);
            await expect(element).toHaveJSProperty('appearance', `${value}`);
            await expect(element).toHaveAttribute('appearance', `${value}`);
        });
    }
});
//# sourceMappingURL=avatar.spec.js.map