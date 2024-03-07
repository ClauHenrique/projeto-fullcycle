import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { RegisterAction } from "../../server-actions/auth.action";
import { AuthService } from "../../services/auth.service";
import { redirect } from "next/navigation";
// import { Form } from "../../components/Form";

async function RegisterPage({
  searchParams,
}: {
  searchParams: { redirect_to?: string };
}) {
  const { redirect_to = "/products" } = searchParams;

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Crie uma conta
      </Typography>
      <Box component={"form"} noValidate sx={{ mt: 1 }} action={RegisterAction}>
        <input type="hidden" name="redirect_to" value={redirect_to} />
        <TextField
          margin="normal"
          required
          fullWidth
          label="E-mail"
          name="email"
          autoComplete="email"
          defaultValue={""}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          autoComplete="current-password"
          defaultValue={""}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Criar
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
