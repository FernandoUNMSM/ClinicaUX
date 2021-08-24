import React, { useState } from 'react'
import { InfoPerfil, TopInputs } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faCloudMoon, faEnvelope, faFingerprint, faHospitalAlt, faHourglassHalf, faIdCard, faMapMarkedAlt, faTag, faVenusMars } from '@fortawesome/free-solid-svg-icons'
// import Context from '../../context/languageContext';
// import setFont2 from '../../services/setFont';

export default function PerfilInfo({user}) {
  // const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('usuario')))
  const tipoUsuario = user.tipoUsuario;

  return (<>
    <InfoPerfil>
      <figure>
        <img src="https://m.media-amazon.com/images/I/51-H2JY9eyL._AC_SX466_.jpg" alt="" />
      </figure>
      <div className="info">
        <div className="infoItem">
          <span>Nombres</span>
          <p>{user.nombre}</p>
        </div>
        <div className="infoItem">
          <span>Apellido Paterno</span>
          <p>{user.apellidoP}</p>
        </div>
        <div className="infoItem">
          <span>Apellido Materno</span>
          <p>{user.apellidoM}</p>
        </div>
      </div>
    </InfoPerfil>
    <TopInputs>
      <div className="info">
        <div className="infoTitle">
          <p>Informacion Personal</p>
        </div>
        <div className="infoItem">
          <div className="left">
            <FontAwesomeIcon icon={faIdCard} className='icon' />
            <p>DNI</p>
          </div>
          <div className="right">
            <p>{user.dni}</p>
          </div>
        </div>
        <div className="infoItem">
          <div className="left">
            <FontAwesomeIcon icon={faVenusMars} className='icon' />
            <p>SEXO</p>
          </div>
          <div className="right">
            <p>{user.sexo || 'M'}</p>
          </div>
        </div>
        <div className="infoItem">
          <div className="left">
            <FontAwesomeIcon icon={faEnvelope} className='icon' />
            <p>E-MAIL</p>
          </div>
          <div className="right">
            <p>{user.email}</p>
          </div>
        </div>
        <div className="infoItem">
          <div className="left">
            <FontAwesomeIcon icon={faMapMarkedAlt} className='icon' />
            <p>DIRECCION</p>
          </div>
          <div className="right">
            <p>{user.direccion}</p>
          </div>
        </div>
        <div className="infoItem">
          <div className="left">
            <FontAwesomeIcon icon={faBirthdayCake} className='icon' />
            <p>FECHA DE NACIMIENTO</p>
          </div>
          <div className="right">
            <p>{user.fechanac}</p>
          </div>
        </div>
        {
          (tipoUsuario === 'paciente')
          ? <>
            <div className="infoItem">
              <div className="left">
                <FontAwesomeIcon icon={faHospitalAlt} className='icon' />
                <p>CENTRO ASISTENCIAL</p>
              </div>
              <div className="right">
                <p>{user.centro}</p>
              </div>
            </div>
            <div className="infoItem">
              <div className="left">
                <FontAwesomeIcon icon={faFingerprint} className='icon' />
                <p>TIPO</p>
              </div>
              <div className="right">
                <p>{user.tipoSeguro}</p>
              </div>
            </div>
            <div className="infoItem">
              <div className="left">
                <FontAwesomeIcon icon={faHourglassHalf} className='icon' />
                <p>VIGENCIA</p>
              </div>
              <div className="right">
                <p>{user.vigencia}</p>
              </div>
            </div>
            </>: null
        }
        {
          (tipoUsuario === 'doctor')
          ? <>
            <div className="infoItem">
              <div className="left">
                <FontAwesomeIcon icon={faTag} className='icon' />
                <p>ESPECIALIDAD</p>
              </div>
              <div className="right">
                <p>{user.especialidad}</p>
              </div>
            </div>
            <div className="infoItem">
              <div className="left">
                <FontAwesomeIcon icon={faCloudMoon} className='icon' />
                <p>TURNO</p>
              </div>
              <div className="right">
                <p>{user.turno}</p>
              </div>
            </div>
            </>: null
        }

      </div>
    </TopInputs>
  </>)
}