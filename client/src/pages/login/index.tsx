import TextInput from '@/components/input-text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { API_AUTH_URL } from '@/constants/env';
import { instance } from '@/service/axios';
import loginValidation, { LoginType } from '@/validation/login-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginType>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev: boolean) => !prev);
  }, []);

  const onSubmit = useCallback(
    async (data: LoginType) => {
      setLoading(true);
      try {
        const response = await instance.post(`${API_AUTH_URL}/login`, data);
        const { token } = response.data.data;
        localStorage.setItem('token', token);
        window.location.href = '/';
      } catch (error) {
        console.error(error);
        alert('Failed to login. Message: ' + error);
      } finally {
        setLoading(false);
        form.reset();
      }
    },
    [form]
  );

  return (
    <div className={'flex flex-col gap-6 max-w-2xl justify-center items-center h-screen mx-auto'}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <TextInput<LoginType> name="username" label="Username" placeholder="e.g. Johndoe" isRequired />
                <TextInput<LoginType>
                  name="password"
                  label="Password"
                  type="password"
                  handleChangePassword={handleShowPassword}
                  showPassword={showPassword}
                  placeholder="*******"
                  isRequired
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
