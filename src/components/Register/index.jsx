import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message";

import { InputRegisterContainer, Apellidos, ApellidosContainer, MessageError } from './styles'
import { Form, FormContainer, Title, Button } from './../Login/styles'
import Errormodal from 'components/errormodal/errormodal'
import Loader from 'components/loader'
import Input from 'components/Input'

import sendRegistro from 'services/sendRegistro';
import getInfoDNI from 'services/getInfoDNI';

export default function RegisterForm({ }) {
  let history = useHistory();
  const [loading, setLoading] = useState(false)
  const [errorM, setErrorM] = useState(false)
  const [message, setMessage] = useState('')

  const [datesDNI, setDatesDNI] = useState({
    nombres: '',
    paterno: '',
    materno: ''
  })

  const { handleSubmit, register, setError, watch, clearErrors, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    criteriaMode: "all"
  })

  const onSumbit = (data, e) => {
    e.preventDefault()
    setLoading(true)
    const fecha = new Date()
    const newUser = {
      nombre: data.nombre || datesDNI.nombres,
      apellidoP: data.apellidoP || datesDNI.paterno,
      apellidoM: data.apellidoM || datesDNI.materno,
      dni: data.dni || datesDNI.dni,
      sexo: datesDNI.sexo,
      correo: data.correo,
      contrasena: data.password,
      vigencia: `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()+1}`,
      tipoUsuario: 'paciente'
    }
    sendRegistro(newUser)
      .then(res => {
        setLoading(false)
        if (res === 'user created') {
          return history.push('/ClinicaPaciente')
        } else {
          setErrorM(true)
          setMessage(res)
        }
      })
  }
  const password = watch("password", "");

  const dni = register('dni', {
    minLength: {
      value: 8,
      message: 'El dni deben ser 8 digitos'
    }
  })
  const validateNumbers = (evt) => {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch))) {
      evt.preventDefault();
    }
  }
  const getInfo = (evt) => {
    const dni = evt.target.value
    if (dni.length === 8) {
      clearErrors('dni')
      getInfoDNI(dni)
        .then(res => {
          (res !== undefined) ? setDatesDNI(res) : console.log('avion dijo el camion')
        })
      // setDatesDNI({
      //   dni: '72188379',
      //   materno: "ROJAS",
      //   nombres: "OSCAR FERNANDO",
      //   paterno: "CABELLOS",
      //   sexo: "M",
      // })
    } else {
      setDatesDNI({
        nombres: '',
        paterno: '',
        materno: ''
      })
    }
  }
  const validatePassword = (evt) => {
    if (password === evt.target.value) {
      clearErrors("passwordC")
    } else {
      setError('passwordC', {
        type: 'manual',
        message: 'No coincide'
      })
    }
  }

  const nombres = register('name')
  const apellidoP = register('apellidoP')
  const apellidoM = register('apellidoM')
  const passwordC = register('passwordC')

  return (
    <>
      {(loading) ? <Loader /> : null}
      {(errorM) ? <Errormodal setErrorM={setErrorM} message={message} /> : null}
      <FormContainer>
        <Form onSubmit={handleSubmit(onSumbit)}>
          <Title>Registro</Title>
          <InputRegisterContainer>
            <Input
              name='dni'
              label='DNI'
              maxLength='8'
              onKeyPress={validateNumbers}
              onChange={(evt) => {
                dni.onChange(evt)
                getInfo(evt)
              }}
              onBlur={dni.onBlur}
              ref={dni.ref}
            >
              <ErrorMessage
                errors={errors}
                name="dni"
                maxLength='8'
                render={({ messages }) => {
                  // document.getElementsByName(errors.dni.ref.name)[0].classList.add('on')
                  return messages
                    ? <MessageError><p>{messages.minLength}</p></MessageError>
                    : null;
                }}
              />
            </Input>
            <Input
              name='name'
              label='Nombre'
              value={datesDNI.nombres}
              onChange={nombres.onChange}
              onBlur={nombres.onBlur}
              ref={nombres.ref}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                  : null;
              }}
            />
            <Apellidos>
              <ApellidosContainer>
                <Input
                  name='apellidoP'
                  label='Apellido Paterno'
                  value={datesDNI.paterno}
                  apellido={true}
                  onChange={apellidoP.onChange}
                  onBlur={apellidoP.onBlur}
                  ref={apellidoP.ref}
                />
                <Input
                  name='apellidoM'
                  label='Apellido Materno'
                  value={datesDNI.materno}
                  apellido={true}
                  onChange={apellidoM.onChange}
                  onBlur={apellidoM.onBlur}
                  ref={apellidoM.ref}
                />
              </ApellidosContainer>
            </Apellidos>
            <Input
              name='correo'
              label="Email"
              {...register('correo', {
                pattern: {
                  value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/g,
                  message: 'El correo debe seguir el patron xxxx@xxxx.xxxx'
                }
              })}
            >
              <ErrorMessage
                errors={errors}
                name="correo"
                render={({ messages }) => {
                  return messages ? <MessageError><p>{messages.pattern}</p></MessageError> : null;
                }}
              />
            </Input>
            <Input
              name='password'
              label="Contraseña"
              {...register('password', {
                minLength: {
                  value: 3,
                  message: 'La contraseña debe tener 8 digitos como minimo(por ahora solo 123 xfa)'
                }
              })}
            >
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ messages }) => {
                  return messages ? <MessageError><p>{messages.minLength}</p></MessageError> : null
                }}
              />
            </Input>
            <Input
              name='passwordC'
              label="Confirmar contraseña"
              onChange={(evt) => {
                passwordC.onChange(evt)
                validatePassword(evt)
              }}
              onBlur={passwordC.onBlur}
              ref={passwordC.ref}
            >
              {errors.passwordC && <MessageError> <p>{errors.passwordC.message}</p></MessageError>}
            </Input>
          </InputRegisterContainer>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button type='submit'>Registrate</Button>
            <span style={{ marginTop: '10px', fontSize: '12px' }}>¿Ya tienes una cuenta? <Link to='/login'>Logeate</Link></span>
          </div>
        </Form>
      </FormContainer>
    </>
  )
}