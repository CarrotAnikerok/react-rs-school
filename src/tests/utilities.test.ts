import { validateEmail } from '../components/schemas/submissions';
import {
  getColoredStrength,
  getPasswordStrength,
  toBase64,
} from '../components/utils/utils';

describe('Utilities Component', () => {
  describe('validate password strength', () => {
    it('very bad', () => {
      const veryBadPassword = getPasswordStrength('mew');
      expect(veryBadPassword).toBe('Very bad');
    });

    it('bad', () => {
      const badPassword = getPasswordStrength('mewWW');
      expect(badPassword).toBe('Bad');
    });

    it('good', () => {
      const goodPassword = getPasswordStrength('mewWW!!');
      expect(goodPassword).toBe('Good');
    });

    it('perfect', () => {
      const perfectPassword = getPasswordStrength('mewWW!!12');
      expect(perfectPassword).toBe('Perfect');
    });
  });

  describe('validate password color', () => {
    it('very bad', () => {
      const veryBadPassword = getColoredStrength('mew');
      expect(veryBadPassword).toMatchInlineSnapshot(`
        <span
          style={
            {
              "color": "red",
            }
          }
        >
          Very bad
        </span>
      `);
    });

    it('bad', () => {
      const badPassword = getColoredStrength('mewWW');
      expect(badPassword).toMatchInlineSnapshot(`
        <span
          style={
            {
              "color": "orange",
            }
          }
        >
          Bad
        </span>
      `);
    });

    it('good', () => {
      const goodPassword = getColoredStrength('mewWW!!');
      expect(goodPassword).toMatchInlineSnapshot(`
        <span
          style={
            {
              "color": "lightgreen",
            }
          }
        >
          Good
        </span>
      `);
    });

    it('perfect', () => {
      const perfectPassword = getColoredStrength('mewWW!!12');
      expect(perfectPassword).toMatchInlineSnapshot(`
        <span
          style={
            {
              "color": "green",
            }
          }
        >
          Perfect
        </span>
      `);
    });
  });

  it('convert file to base64', async () => {
    const fileContent = 'hello world';
    const file = new File([fileContent], 'test.txt', { type: 'text/plain' });

    const result = await toBase64(file);

    expect(result).toContain('data:text/plain;base64,');

    const base64Data = result.split(',')[1];
    const decodedContent = atob(base64Data);
    expect(decodedContent).toBe(fileContent);
  });

  describe('validate email', () => {
    it('email without @', () => {
      const email = validateEmail('mew.com');
      expect(email).toBe(false);
    });

    it('email without first part before @', () => {
      const email = validateEmail('@mew.com');
      expect(email).toBe(false);
    });

    it('email without second part after @', () => {
      const email = validateEmail('mew.com@');
      expect(email).toBe(false);
    });

    it('email without . in second part', () => {
      const email = validateEmail('mew.com@mew');
      expect(email).toBe(false);
    });

    it('valid email', () => {
      const email = validateEmail('mew.com@mew.com');
      expect(email).toBe(true);
    });
  });
});
