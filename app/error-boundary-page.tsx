import { isRouteErrorResponse } from "react-router";
import type { Route } from "../.react-router/types/app/+types/root";

interface ErrorBoundaryPageProps {
  props: Route.ErrorBoundaryProps;
}

export function ErrorBoundaryPage({
  props: { error },
}: ErrorBoundaryPageProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <div className="flex flex-col w-full items-center justify-center gap-4 pt-12">
          <h1 className="text-7xl font-bold text-shadow-lg text-red-500">
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </div>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <main>
        <div className="flex flex-col w-full items-center justify-center gap-4 pt-12">
          <h1 className="text-7xl font-bold text-shadow-lg text-red-500">
            Error
          </h1>
          <p>{error.message}</p>
          <p className="text-muted-foreground">The stack trace is:</p>
          <p className="text-xs w-11/12 pb-4">{error.stack}</p>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <div className="flex flex-col w-full items-center justify-center gap-4 pt-12">
          <h1 className="text-7xl font-bold text-shadow-lg text-red-500">
            Unknown Error
          </h1>
        </div>
      </main>
    );
  }
}
