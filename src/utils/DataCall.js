export class DataCall {
  // Just simulating incremental loading, don't infer anything from here
  static async get() {
    const firstResponse = await fetch(
      "http://5cb9f093f841d2001455e8fe.mockapi.io/sports"
    );
    const firstResponseJson = await firstResponse.json();
    const fullData = firstResponseJson.message
    return fullData;
  }
}
