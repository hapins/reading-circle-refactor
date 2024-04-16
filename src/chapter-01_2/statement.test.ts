import { expect, test } from 'vitest';
import { statement, htmlStatement } from './statement.mjs';

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

test('htmlStatement function', () => {
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

  const result = htmlStatement(invoice, plays);
  // ここでresultの値を検証します。期待する値には実際の期待する結果を入力してください。
  expect(result).toBe(
    `<h1>Statement for BigCo</h1>\n<table>\n<tr><th>play</th><th>seats</th><th>cost</th></tr> <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n</table>\n<p>Amount owed is <em>$1,730.00</em></p>\n<p>You earned <em>47</em> credits</p>\n`,
  );
});
