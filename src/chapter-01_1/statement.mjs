import invoices from './data/invoices.json' assert { type: 'json' };
import plays from './data/plays.json' assert { type: 'json' };

export default function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  for (let perf of invoice.performances) {
    // const play = plays[perf.playID];
    // NOTE: 問い合わせによる一時変数の置き換え（p.185）
    // const play = playFor(perf);

    // NOTE: 変数のインライン化（p.129）
    let thisAmount = amountFor(perf);
    // let thisAmount = 0;
    // switch (play.type) {
    //   case 'tragedy':
    //     thisAmount = 40000;
    //     if (perf.audience > 30) {
    //       thisAmount += 1000 * (perf.audience - 30);
    //     }
    //     break;
    //   case 'comedy':
    //     thisAmount = 30000;
    //     if (perf.audience > 20) {
    //       thisAmount += 10000 + 500 * (perf.audience - 20);
    //     }
    //     thisAmount += 300 * perf.audience;
    //     break;
    //   default:
    //     throw new Error(`unknown type: ${play.type}`);
    // }
    // NOTE: 関数の摘出
    // let thisAmount = amountFor(perf, play);
    // ボリューム特典のポイントを加算
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 喜劇のときは10 人につき、さらにポイントを加算
    if ('comedy' === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
    // 注文の内訳を出力
    result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

invoices.forEach(invoice => {
  console.log(statement(invoice, plays));
});

function amountFor(performance) {
  // let thisAmount = 0;
  // switch (play.type) {
  //   case 'tragedy':
  //     thisAmount = 40000;
  //     if (performance.audience > 30) {
  //       thisAmount += 1000 * (performance.audience - 30);
  //     }
  //     break;
  //   case 'comedy':
  //     thisAmount = 30000;
  //     if (performance.audience > 20) {
  //       thisAmount += 10000 + 500 * (performance.audience - 20);
  //     }
  //     thisAmount += 300 * performance.audience;
  //     break;
  //   default:
  //     throw new Error(`unknown type: ${play.type}`);
  // }
  // return thisAmount;

  // // NOTE: 変数名の変更
  // let result = 0;
  // switch (play.type) {
  //   case 'tragedy':
  //     result = 40000;
  //     if (performance.audience > 30) {
  //       result += 1000 * (performance.audience - 30);
  //     }
  //     break;
  //   case 'comedy':
  //     result = 30000;
  //     if (performance.audience > 20) {
  //       result += 10000 + 500 * (performance.audience - 20);
  //     }
  //     result += 300 * performance.audience;
  //     break;
  //   default:
  //     throw new Error(`unknown type: ${play.type}`);
  // }
  // return result;

  // NOTE: 関数宣言の変更
  let result = 0;
  switch (playFor(performance).type) {
    case 'tragedy':
      result = 40000;
      if (performance.audience > 30) {
        result += 1000 * (performance.audience - 30);
      }
      break;
    case 'comedy':
      result = 30000;
      if (performance.audience > 20) {
        result += 10000 + 500 * (performance.audience - 20);
      }
      result += 300 * performance.audience;
      break;
    default:
      throw new Error(`unknown type: ${playFor(performance).type}`);
  }
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
