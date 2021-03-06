import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { singOut } from '~/store/modules/auth/actions';

import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {

  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));

  }

  function handleSingOut(){
    dispatch(singOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>

        <AvatarInput  name="avatar_id"/>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Endereco de Email" />

        <hr />

        <Input type="password" name="oldPassword" placeholder="Sua Senha Atual" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input type="password" name="confirmPassword" placeholder="Confirmar senha" />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button" onClick={handleSingOut}>Sair do GoBarber</button>
    </Container>
  )
}
