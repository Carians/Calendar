import { isRouteErrorResponse,  useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if(isRouteErrorResponse(error)){
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <h2>{error.status}</h2>
          <i>{error.statusText}</i>
          {error.data?.message && <p>{error.data.message}</p>}
        </p>
      </div>
    );
  }

  return <p>"Unknown Error"</p>
}