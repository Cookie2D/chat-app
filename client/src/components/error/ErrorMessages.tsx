import { Typography } from "@mui/material";export default function ErrorMessages({ errors }: { errors: string[] }) {
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
