'use client';

import * as React from 'react';
import Link from 'next/link'; // Correct import for next/link
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

type DashboardPath =
  | typeof paths.dashboard.author.overview
  | typeof paths.dashboard.editor.overview
  | typeof paths.dashboard.reviewer.overview;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error, roles } = await authClient.signInWithPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // Determine the redirect path based on the user role
      let redirectPath: DashboardPath = paths.dashboard.author.overview; // default to author dashboard

      if (roles?.includes('editor')) {
        redirectPath = paths.dashboard.editor.overview;
      } else if (roles?.includes('reviewer')) {
        redirectPath = paths.dashboard.reviewer.overview;
      }

      // Redirect to the appropriate dashboard
      router.replace(redirectPath);
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" sx={{ color: 'black' }}>
          Login
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel sx={{ color: 'black' }}>Email address</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Email address"
                  type="email"
                  sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '#7c3b10' } }}
                />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel sx={{ color: 'black' }}>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '#7c3b10' } }}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3, bgcolor: '#7c3b10', '&:hover': { bgcolor: '#5b2808' } }}
            type="submit"
            variant="contained"
            disabled={isPending}
          >
            Login
          </Button>
          <Box textAlign="center">
            <Typography variant="body2" sx={{ color: '#7c3b10' }}>
              OR
            </Typography>
          </Box>
          <Button
            component={Link}
            href={paths.auth.signUp}
            fullWidth
            size="large"
            sx={{
              mt: 1,
              color: '#7c3b10',
              borderColor: '#7c3b10',
              '&:hover': { borderColor: '#5b2808', color: '#5b2808' },
            }}
            variant="outlined"
          >
            Register
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
