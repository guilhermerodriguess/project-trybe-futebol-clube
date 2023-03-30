export default class HTTPError extends Error {
  public status = 500;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
