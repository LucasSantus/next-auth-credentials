import * as crypto from "crypto";

class Hash {
  private static readonly defaultBytes: number = 20;

  static createHash(textToHash: string): string {
    return crypto.createHash("sha256").update(textToHash).digest("hex");
  }

  static randomBytes(): string {
    return crypto.randomBytes(this.defaultBytes).toString("hex");
  }
}

const generateHash = Hash;

export default generateHash;
