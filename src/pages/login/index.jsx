import React, { useState, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { AuthContext } from '../../contexts/AuthContext';

import { LoginContent, Form } from './style';
import { Input, Button, Label } from '../../styles/form';

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();

  const { signIn } = useContext(AuthContext);

  const handleOnSubmit = useCallback((data) => {
    setSubmitting(true);
    signIn(data);
  }, []);

  return (
    <LoginContent>
      <Header title="Agenda de Churras" />
      <main>
        <div className="container">
          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <Label isLogin htmlFor="login">Login</Label>
            <Input
              isLogin
              ref={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              name="login"
              id="login"
              type="email"
              placeholder="e-mail"
              required
            />
            <Label isLogin htmlFor="password">Senha</Label>
            <Input isLogin ref={register({ required: true })} name="password" id="password" placeholder="senha" type="password" required />
            <Button isLogin type="submit" disabled={submitting ? 'disabled' : ''}>Entrar</Button>
          </Form>
        </div>
      </main>
      <Footer />
    </LoginContent>
  );
};

export default Login;
