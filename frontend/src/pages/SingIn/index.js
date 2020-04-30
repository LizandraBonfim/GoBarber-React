import React from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { singInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite e-mail valido')
    .required('E-mail obrigatorio'),
  password: Yup.string()
    .required('Senha obrigatoria')
})


export default function SingIn() {

const dispatch = useDispatch();
const loading = useSelector(state => state.auth.loading);

  function handleSubmit({email, password}) {
    dispatch(singInRequest(email,password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Password" />

        <button type="submit" >{loading? 'Carregando...' : 'Acessar'}</button>

        <Link to="/register">Criar conta</Link>
      </Form>
    </>
  )
}
