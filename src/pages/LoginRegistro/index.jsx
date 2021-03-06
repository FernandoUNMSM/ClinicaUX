import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import SendLogin from 'services/sendLogin'
import SendRegistro from 'services/sendRegistro'
import Loader from 'components/loader'
import Errormodal from 'components/errormodal/errormodal'
export default function LoginRegistro({ }) {
  let history = useHistory();
  const [loginState, setLoginState] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
	const [message, setMessage] = useState('')

  const toggleLogin = () => {
    setLoginState(true)
    document.querySelector(".line").classList.remove('lineActive')
  }

  const toggleRegistro = () => {
    setLoginState(false)
    document.querySelector(".line").classList.add('lineActive')
  }

  const sendLogin = (evt) => {
    evt.preventDefault()
    const formData = new FormData(evt.target)
    setLoading(true)
    SendLogin({ formData })
      .then(res => {
        setLoading(false)
        return (res.valid) ? history.push(res.path) : null
      })
  }

  const sendRegistro = (evt) => {
    evt.preventDefault()
    const formData = new FormData(evt.target)
    formData.set('tipoUsuario', 'paciente')
    if (validarForm(formData)) {
      setLoading(true)
      SendRegistro({ formData })
        .then(res => {
          setLoading(false)
          if(res === 'user created') {
            return history.push('/ClinicaPaciente')
          }else {
            setError(true)
            setMessage(res)
          }
        })
    } else {
      console.log('jj')
    }
  }

  const validarForm = (formdata) => {
    const valores = formdata.getAll('password')
    if (valores[0] === valores[1]) {
      return true
    }
    return false
  }

  return (<>
    {
      (loading)
        ? <Loader />
        : null
    }
    {
      (error)
      ? <Errormodal setError={setError} message={message} />
      : null
    }
    <div className="loginRegistroContainer">
      <div className="login-container">
        <div className="tabs">
          <button className="tab-active" onClick={toggleLogin}>Login</button>
          <button onClick={toggleRegistro}>Registrate</button>
          <div className="line" ></div>
        </div>
        <div className="loginBody">
          {
            (loginState)
              ?
              <div className="login">
                <form action="POST" onSubmit={sendLogin}>
                  <div className="uc usuario">
                    {/* <label for="E-mail"><fa-icon [icon]="faUserAlt"></fa-icon> E-mail</label> */}
                    <input type="text" name="email" placeholder="E-mail" autoComplete="off" required />
                  </div>
                  <div className="uc contrasena">
                    {/* <label for="Contrase??a"><fa-icon [icon]="faLock"></fa-icon> Contrase??a</label> */}
                    <input type="password" name="password" id="" placeholder="Contrase??a" required />
                  </div>
                  <button type="sumbit">Ingresar</button>
                </form>
              </div>
              :
              <div className="registro">
                <form action="POST" onSubmit={sendRegistro}>
                  <div className="uc usuario apellido">
                    <input type="text" name="name" placeholder="Nombres" autoComplete="off" required />
                    <input type="text" name="apellido" placeholder="Apellidos" autoComplete="off" required />
                  </div>
                  {/* <div className="uc usuario">
                </div> */}
                  <div className="uc email">
                    <input type="email" name="email" placeholder="e-mail" autoComplete="off" required />
                  </div>
                  <div className="uc usuario">
                    <input type="text" name="dni" placeholder="DNI" autoComplete="off" required />
                  </div>
                  <div className="uc password">
                    <input type="text" name="sexo" placeholder="Sexo (M-F)" autoComplete="off" required />
                  </div>
                  <div className="uc usuario apellido">
                    <input type="password" name="password" placeholder="Contrase??a" required />
                    <input type="password" name="password" placeholder="Confirmar" required />
                  </div>
                  {/* <div className="uc password2">
                  </div> */}
                  <button>Registrarse</button>
                </form>
              </div>
          }
        </div>
      </div>

      <div className="returnHome">
        <Link to='/'>Volver al Home</Link>
      </div>

      <div className="incorrecto-container" >
        <div className="incorrecto">
          <div className="datos">
            <h1>Datos Incorrectos</h1>
            <p>Vuelva a ingresar sus datos</p>
          </div>
          <div className="equis">
            {/* <fa-icon [icon]="faTimes"></fa-icon> */}
          </div>
          <button>Cerrar</button>
        </div>
      </div>

    </div>
  </>)
}