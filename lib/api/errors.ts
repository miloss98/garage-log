export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// The API returns either { message } or a zod error: { errors: { formErrors, fieldErrors } }.
export async function toApiError(res: Response): Promise<ApiError> {
  const body = await res.json().catch(() => null);

  const fieldErrors: Record<string, string[]> = body?.errors?.fieldErrors ?? {};
  const firstFieldError = Object.entries(fieldErrors)[0];

  const message =
    body?.message ??
    (firstFieldError
      ? `${firstFieldError[0]}: ${firstFieldError[1][0]}`
      : `Request failed (${res.status})`);

  return new ApiError(res.status, message);
}
