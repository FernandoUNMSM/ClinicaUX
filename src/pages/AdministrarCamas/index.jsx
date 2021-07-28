import React, { useState, useEffect  } from 'react'
import { Container, TitleContainer, PacienteContainer, BuscadorContainer, TablaContainer, AnadirContainer } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'
import Tabla from 'components/Tabla'
import getCamas from 'services/getCamas'

export default function AdministrarCamas ({}){
  const [camas, setCamas] = useState([])
  useEffect(()=> {
    getCamas()
      .then(setCamas)
  },[])

  return (<>
    <Container>
      <TitleContainer>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} className='icon'/>
        <h1>Administrar Camas</h1>
      </TitleContainer>
      <PacienteContainer>
        <BuscadorContainer>
          <input type="text" />
        </BuscadorContainer>
        <TablaContainer>
          <Tabla>
            <div className="tablapacientees">
              <table>
                <thead>
                  <tr>
                    <th className='small'>Cama</th>
                    <th className='small'>Sala</th>
                    <th className='small'>Ocupada</th>
                    <th>Paciente</th>
                    <th>Cambiar estado</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    camas.map((cama, index) =>
                      <tr key={cama.idcamas}>
                        <td>{cama.idcamas}</td>
                        <td>{cama.sala}</td>
                        <td>{cama.estado}</td>
                        <td>{cama.nombre}</td>
                        <td>
                          <button>Editar</button>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </Tabla>
        </TablaContainer>
        <AnadirContainer>
          <button>Añadir Cama</button>
        </AnadirContainer>
      </PacienteContainer>
    </Container>
  </>)
}