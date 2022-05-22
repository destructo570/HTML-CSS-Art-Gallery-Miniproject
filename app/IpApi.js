export class IpApi {
  static BASE_URL = "https://geo.ipify.org/api/v1?";
  static API_KEY = "at_Q9GFo0YO2fnakzXFFUa3It6wNuY06";

  static async getLocationFromIpAddress(ipAddress) {
    let url = "";

    if (ipAddress === "" || ipAddress === null) {
      url = this.BASE_URL + `apiKey=${this.API_KEY}`;
    } else {
      url = this.BASE_URL + `apiKey=${this.API_KEY}&ipAddress=${ipAddress}`;
    }

    try {
      const data = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
