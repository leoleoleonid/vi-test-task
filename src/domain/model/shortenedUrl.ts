export class ShortenedUrl {
  id: number;
  prefix: string;
  userId: number;
  originalURL: string;
  accessCounter: number;
  shortenedCounter: number;

  increaseAccessCounter(): void {
    this.accessCounter = this.accessCounter + 1;
  }

  increaseShortenedCounter(): void {
    this.shortenedCounter = this.shortenedCounter + 1;
  }

  static generatePrefix(length = 15): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
