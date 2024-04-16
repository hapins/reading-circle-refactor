import { expect, test } from 'vitest';
import statement from './statement.mjs';

test('statement function', () => {
  const invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as−like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  };

  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as−like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' },
  };

  const result = statement(invoice, plays);
  // ここでresultの値を検証します。期待する値には実際の期待する結果を入力してください。
  expect(result).toBe(`Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits\n`);
});
