import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { singInSuccess, singFailure } from './actions';

export function* singIn({ payload }) {

  try {

    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    console.tron.log(`dados do usuario`, user)

    if (!user.provider) {
      toast.error('Usuario nao e prestador');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(singInSuccess(token, user));

    history.push('/dashboard');

  } catch (err) {
    toast.error('Falha na autenticacao, verifique seus dados.');
    yield put(singFailure());
  }
}

export function* singUp({ payload }) {
  try {

    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');

  } catch (err) {
    toast.error('Erro no cadastro, verifique seus dados.');

    yield put(singFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function singOut(){
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SING_IN_REQUEST', singIn),
  takeLatest('@auth/SING_UP_REQUEST', singUp),
  takeLatest('@auth/SING_OUT', singOut),
]);
