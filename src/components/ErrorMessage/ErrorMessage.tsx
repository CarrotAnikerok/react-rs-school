type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div>
      <h3>Pony results!</h3>
      <div>{message}</div>
    </div>
  );
}
