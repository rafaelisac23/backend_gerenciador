export class AppError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;

    // Corrige o prototype para instanceof funcionar corretamente
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
