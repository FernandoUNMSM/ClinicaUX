import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faIdBadge, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { Container, TitleContainer, PacienteContainer, BuscadorContainer, TablaContainer, AnadirContainer } from './styles'
import ButtonAnadir from 'components/buttonAnadir'
import Anadir from 'components/anadir'
import EditarItem from 'components/editarItem';
import ModalProfile from 'components/modalProfile';
import getPacientes from 'services/listarPacientes'
import getCamas from 'services/getCamas'
import setFont2 from 'services/setFont';
import Context from '../../context/languageContext';
import deleteUser from 'services/deleteUser'
import deleteCama from 'services/deleteCama'
import getAllDoctores from 'services/getAllDoctores'
import Loader from 'components/loader'
import FiltrarIndividuos from 'components/filtrarIndividuos'

const SERVICES = {
  Personal: () => getAllDoctores(),
  Paciente: () => getPacientes(),
  Camas: () => getCamas()
}

const DELETES = {
  Personal: (id) => deleteUser(id),
  Paciente: (id) => deleteUser(id),
  Camas: (id) => deleteCama(id)
}

export default function Administrar({ type }) {
  const [pacientesTotal, setPacientesTotal] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState('')

  const [anadir, setAnadir] = useState(false)
  const [editar, setEditar] = useState(false)
  const [profile, setProfile] = useState(false)
  const [loading, setLoading] = useState(true)

  const { language, setLanguage, texts } = useContext(Context)

  useEffect(() => {
    setPacientes([])
    setLoading(true)
    SERVICES[type]()
      .then(res => {
        setPacientes(res)
        setPacientesTotal(res)
        setLoading(false)
      })
  }, [type])

  const editarItem = (evt) => {
    const id = evt.target.parentNode.parentNode.parentNode.id;

    (type !== 'Camas')
      ? setPaciente(pacientes.find(item => item.id == id))
      : setPaciente(pacientes.find(item => item.idcamas == id))

    setEditar(true)
  }

  const handleProfile = (evt) => {
    const idpac = evt.target.parentNode.parentNode.parentNode.id
    const usuarioEle = pacientes.find(paciente => paciente.id == idpac);
    setPaciente(usuarioEle)
    setProfile(true)
  }
  const deletePaciente = (evt) => {
    const idpac = evt.target.parentNode.parentNode.parentNode.id;
    if (type !== 'Camas') {
      setPacientes(pacientes.filter(paciente => paciente.id != idpac))
      setPacientesTotal(pacientes.filter(paciente => paciente.id != idpac))
    } else {
      setPacientes(pacientes.filter(paciente => paciente.idcamas != idpac))
      setPacientesTotal(pacientes.filter(paciente => paciente.idcamas != idpac))
    }
    DELETES[type](idpac)
  }

  return (<>
    {
      (profile)
        ? <ModalProfile dni={paciente.dni} setProfile={setProfile} />
        : null
    }
    {
      (editar)
        ? <EditarItem setEditar={setEditar} itemActual={paciente} type={type} setPacientes={setPacientes} setPacientesTotal={setPacientesTotal} />
        : null
    }
    {
      (anadir)
        ? <Anadir type={type} setAnadir={setAnadir} setPacientes={setPacientes} setPacientesTotal={setPacientesTotal} />
        : null
    }
    <Container>
      {(loading) ? <Loader /> : null}
      <TitleContainer>
        <Link to='/ClinicaAdministrador'>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} className='icon' />
        </Link>
        <h1>{(type == 'Paciente') ? texts[language].AdministrarPacientes : (type == 'Personal') ? texts[language].AdministrarPersonal : texts[language].AdministrarCamas}</h1>
      </TitleContainer>
      <PacienteContainer>
        <BuscadorContainer>
          <FiltrarIndividuos pacientesTotal={pacientesTotal} setPacientes={setPacientes} />
        </BuscadorContainer>
        <TablaContainer>
          {
            pacientes.map((paciente) =>
              (type !== 'Camas') ? <>
                <div className="pacienteContainer" key={paciente.id} id={paciente.id}>
                  <div className="pacienteInfo">
                    <div className="infoItem">
                      <p>{(type == 'Paciente') ? 'Paciente: ' : 'Doctor: '}</p>
                      <p>{paciente.nombre}</p>
                    </div>
                    <div className="infoItem">
                      <p>DNI: </p>
                      <p>{paciente.dni}</p>
                    </div>
                    {
                      (type == 'Personal')
                        ? <>
                          <div className="infoItem">
                            <p>ESPECIALIDAD: </p>
                            <p>{paciente.especialidad}</p>
                          </div>
                          <div className="infoItem">
                            <p>TURNO: </p>
                            <p>{paciente.turno}</p>
                          </div>
                        </> : null
                    }
                  </div>
                  <div className="pacienteOpciones">
                    <h1>Opciones</h1>
                    <div className="opciones">
                      <div className="opcion" onClick={handleProfile}>
                        <FontAwesomeIcon icon={faIdBadge} className='icon' />
                        <p>Ver Perfil</p>
                      </div>
                      <div className="opcion" onClick={editarItem}>
                        <FontAwesomeIcon icon={faUserEdit} className='icon' />
                        <p>Editar</p>
                      </div>
                      <div className="opcion" onClick={deletePaciente}>
                        <FontAwesomeIcon icon={faTrash} className='icon' />
                        <p>Eliminar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </> : <>
                <div className="pacienteContainer" key={paciente.idcamas} id={paciente.idcamas}>
                  <div className="pacienteInfo">
                    <div className="infoItem">
                      <p>CAMA: </p>
                      <p>{paciente.idcamas}</p>
                    </div>
                    <div className="infoItem">
                      <p>SALA: </p>
                      <p>{paciente.sala}</p>
                    </div>
                    <div className="infoItem">
                      <p>ESTADO: </p>
                      <p>{paciente.estado}</p>
                    </div>
                    {
                      (paciente.estado === 'Ocupada')
                        ? <div className="infoItem">
                          <p>PACIENTE: </p>
                          <p>{paciente.nombre}</p>
                        </div> : null
                    }
                  </div>
                  <div className="pacienteOpciones">
                    <h1>Opciones</h1>
                    <div className="opciones">
                      <div className="opcion" onClick={editarItem}>
                        <FontAwesomeIcon icon={faUserEdit} className='icon' />
                        <p>Editar</p>
                      </div>
                      <div className="opcion" onClick={deletePaciente}>
                        <FontAwesomeIcon icon={faTrash} className='icon' />
                        <p>Eliminar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        </TablaContainer>
        <AnadirContainer>
          <ButtonAnadir type={type} setAnadir={setAnadir}>
            {(type == 'Paciente') ? texts[language].AnadirPaciente : (type == 'Personal') ? texts[language].AnadirPersonal : texts[language].AnadirCama}
          </ButtonAnadir>
        </AnadirContainer>
      </PacienteContainer>
    </Container>
  </>)
}