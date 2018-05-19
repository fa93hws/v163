class Utils {
  public escapeNumAudience (x: number): string {
    let out!: string;
    if (x < 1e4) {
      out = x.toString();
    } else if (x < 1e8) {
      out = (x / 1e4).toFixed(1).toString() + '万';
    } else {
      out = (x / 1e8).toFixed(1).toString() + '亿';
    }
    return out;
  }
}

export default new Utils();
