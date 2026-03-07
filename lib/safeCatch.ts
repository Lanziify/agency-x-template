type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E> = Success<T> | Failure<E>;

export async function safeCatch<T, E>(fn: () => Promise<T>): Promise<Result<T, E>> {
  try {
    return { data: await fn(), error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
