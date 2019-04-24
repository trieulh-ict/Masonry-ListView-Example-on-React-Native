let data = [
  'https://i.imgur.com/oxss7Kr.jpg',
  'https://i.imgur.com/M70OEe2.jpg',
  'https://i.imgur.com/kNQ3Lkf.jpg',
  'https://i.imgur.com/BrhpQnV.jpg',
  'https://i.imgur.com/ScJRZpQ.jpg',
  'https://i.imgur.com/QtDkUZR.jpg',
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class DataCall {

  // Just simulating incremental loading, don't infer anything from here
  static async get(start, count) {
    await sleep(2000);

    return data;
  }
}
