export class DataCall {
  // Just simulating incremental loading, don't infer anything from here
  static async get(start, count) {
    const responseHusky = await fetch(
      "http://5cb9f093f841d2001455e8fe.mockapi.io/paris"
    );
    const responseBeagle = await fetch(
      "http://5cb9f093f841d2001455e8fe.mockapi.io/paris"
    );
    console.log(responseHusky);

    const responseJsonHusky = await responseHusky.json();
    const responseJsonBeagle = await responseBeagle.json();
    
    console.log(responseJsonBeagle)
    const fullData = responseJsonHusky.message.concat(
      responseJsonBeagle.message
    );

    const filteredData = fullData.slice(
      start,
      Math.min(fullData.length, start + count)
    );
    return filteredData;
  }
}
