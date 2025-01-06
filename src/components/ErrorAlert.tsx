type ErrorAlertProps = {
  message?: string;
};

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className="bg-red-100 border border-red-300 text-red-500 px-4 py-3 rounded-md relative"
      role="alert"
    >
      {message}
    </div>
  );
};

export default ErrorAlert;
