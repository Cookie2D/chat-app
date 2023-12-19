import Avatar from "@mui/material/Avatar";import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import HttpsIcon from "@mui/icons-material/Https";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useAuthenticateUserMutation } from "../../services/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/authSlice";
import ErrorMessages from "../../components/error/ErrorMessages";

const defaultTheme = createTheme();
interface FormData {
  name: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("This is required")
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "No special characters allowed in the username"),
  password: yup
    .string()
    .required("This is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
});

export default function SignIn() {
  const [authenticateUser, { data, isSuccess, isError, error }] = useAuthenticateUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    authenticateUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUser({
          name: data.user.name,
          role: data.user.roleId,
          token: data.access_token,
        })
      );
      navigate("/chat");
    }
  }, [isSuccess, navigate, dispatch, data]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <HttpsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  id="name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="User Name"
                  autoComplete="email"
                  autoFocus
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            {isError && <ErrorMessages errors={error?.data?.message} />}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
