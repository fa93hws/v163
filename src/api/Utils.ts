class Utils {
  constructor() {

  }
  public escapeNumAudience(x: number): string {
    var out!: string;
    if (x<1e4) {
      out = x.toString();
    } else if (x<1e8) {
      out = (x/1e4).toFixed(1).toString() + '万';
    } else {
      out = (x/1e8).toFixed(1).toString() + '亿';
    }
    return out;
  }
}

export default new Utils();

class Greeter {
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
