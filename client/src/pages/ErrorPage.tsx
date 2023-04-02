import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">Oops!</h1>
      <h3 className="text-lg">Sorry, an unexpected error occurred.</h3>
      <p>
        <i className="text-gray-500">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
