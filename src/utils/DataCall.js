export class DataCall {
  // Just simulating incremental loading, don't infer anything from here
  static async get(start, count) {
    const firstResponse = await fetch(
      "http://5cb9f093f841d2001455e8fe.mockapi.io/paris"
    );
    const secondResponse = await fetch(
      "http://5cb9f093f841d2001455e8fe.mockapi.io/paris"
    );
    console.log(firstResponse);

    const firstResponseJson = await firstResponse.json();
    const secondResponseJson = await secondResponse.json();
    
    console.log(secondResponseJson)
    const fullData = firstResponseJson.message.concat(
      secondResponseJson.message
    );

    const filteredData = fullData.slice(
      start,
      Math.min(fullData.length, start + count)
    );
    return filteredData;
  }
}
