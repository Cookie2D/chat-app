import { Typography } from "@mui/material";export default function ErrorMessages({ errors }: { errors: string[] }) {
  if (!Array.isArray(errors)) {
    return (
      <>
        <Typography variant="body2" color="error">
          {errors}
        </Typography>
      </>
    );
  }

  return (
    <>
      {errors.map((message, index) => (
        <Typography key={index} variant="body2" color="error">
          {message}
        </Typography>
      ))}
    </>
  );
}
