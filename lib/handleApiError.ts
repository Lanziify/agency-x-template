import z, { ZodError } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from './error';

type Context = { params: Record<string, string | string[]> };

type ApiRouteHandler = (req: NextRequest, context: Context) => Promise<NextResponse>;

function withApiHandler(handler: ApiRouteHandler): ApiRouteHandler {
  return async (req: NextRequest, context: Context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      const statusCode: number = 500;
      const errorMessage: string = 'An unexpected internal server error occurred.';

      if (error instanceof ZodError) {
        const zodFlattenedError = z.treeifyError(error);
        return NextResponse.json({ message: 'Invalid Request Data', details: zodFlattenedError }, { status: 400 });
      }

      console.log(error);

      return NextResponse.json({ ...(error as ApiError), message: errorMessage } as ApiError, { status: statusCode });
    }
  };
}

export { withApiHandler };
