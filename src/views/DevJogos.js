import {useEffect, useState} from 'react';
import { CButton,
   CCardHeader,
   CRow,
   CCard,
   CCol,
   CCardBody,
   CDataTable,
   CButtonGroup,
   CModal,
   CModalHeader,
   CModalBody,
   CModalFooter,
   CFormGroup,
   CTextarea,
   CLabel,
   CInput,
   CSelect
  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import useApi from '../services/api';


export default () => {
  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading , setModalLoading] = useState(false);
  const [modalTitleField, setModalTitleField] = useState('');
  const [modalBodyField, setModalBodyField] = useState('');
  const [modalId, setModalId] = useState('');

  const fields = [
    {label: 'Nome do Competidor', key: 'title'},
    {label: 'Nota', key: 'notas',  _style:{width:'83px'}, filter: true, sorter: true},
    {label: 'Data de Criação', key: 'datecreated',  _style:{width:'200px'}},
    {label: 'Ações', key: 'actions' , _style:{width:'1px'},filter: false, sorter: false},
  ];

  useEffect(() => {
    getList();
  },[]);

  const getList = async () => {
    setLoading(true);
    const result = await api.getWall();
    setLoading(false);
    if(result.error === '') {
      setList(result.list);
    }else{
      alert(result.error);
    }

  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleEditButton = (index) => {
    setModalId(list[index]['id']);
    setModalTitleField(list[index]['title']);
    setModalBodyField(list[index]['body']);
    setShowModal(true);
  }

  const handleRemoveButton = async (index) => {
    if(window.confirm('Tem certeza que deseja excluir?')){
      const result = await api.removeWall(list[index]['id']);
        if(result.error === ''){
          getList();
        }else{
          alert(result.error)
        }
    }
  }

  const handleNewButton = () => {
    setModalId('')
    setModalTitleField('');
    setModalBodyField('');
    setShowModal(true);
  }

  const handleModalSave = async () =>{
    if(modalTitleField && modalBodyField){
      setModalLoading(true)
      let result;
      let data ={
        title: modalTitleField,
          body: modalBodyField
      }
      if(modalId === ''){
        result = await api.addWall(data);
       }else {
      result = await api.updateWall(modalId,data);
      }
      setModalLoading(false)
        if(result.error === ''){
          setShowModal(false);
          getList();
        }else{
          alert(result.error);
        }
    } else{
      alert('Preencha os campos!')
    }
  }


  return (
    <>
      <CRow>
        <CCol>
          <h2>Cadastro do Desenvolvimento de Jogos</h2>

          <CCard>
            <CCardHeader>
                <CButton
                color="primary"
                onClick={handleNewButton}
                >
                  <CIcon name="cil-check"/>Novo Competidor
                </CButton>
            </CCardHeader>
            <CCardBody>
                <CDataTable
                  items={list}
                  fields={fields}
                  loading={loading}
                  noItemsViewSlot=" "
                  columnFilter
                  sorter
                  hover
                  striped
                  bordered
                  pagination
                  itemsPerPage={5}
                  scopedSlots={{
                    'notas': (item, index) => (
                      <CSelect size="sm" className="mb-3" aria-label="Small select example">
                           <option>Nota</option>
                           <option value="1">1</option>
                           <option value="2">2</option>
                           <option value="3">3</option>
                           <option value="4">4</option>
                           <option value="5">5</option>
                           <option value="6">6</option>
                           <option value="7">7</option>
                           <option value="8">8</option>
                           <option value="9">9</option>
                           <option value="10">10</option>
                      </CSelect>
                    ),
                    'actions': (item, index) => (
                      <td>
                        <CButtonGroup>
                          <CButton color="info" onClick={() =>handleEditButton(index)}>Editar</CButton>
                          <CButton color="danger" onClick={() => handleRemoveButton(index)}>Excluir</CButton>
                        </CButtonGroup>
                      </td>
                    )
                  }}
                />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal show={showModal} onClose={handleCloseModal}>
        <CModalHeader closeButton>{modalId === '' ? 'Novo' : 'Editar'} Competidor</CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CLabel htmlFor="modal-title">Nome do Competidor</CLabel>
              <CInput
               type= "text"
               id="modal-title"
               placeholder="Digite um titulo para o aviso"
               value={modalTitleField}
               onChange={e=>setModalTitleField(e.target.value)}
               disabled = {modalLoading}
               >
              </CInput>
          </CFormGroup>

          <CFormGroup>
            <CLabel htmlFor="modal-body">Observações do Julgamento</CLabel>
              <CTextarea
               id="modal-body"
               placeholder="Digite o conteudo do aviso"
               value={modalBodyField}
               onChange={e=>setModalBodyField(e.target.value)}
               disabled = {modalLoading}
              />

          </CFormGroup>

        </CModalBody>
        <CModalFooter>
          <CButton
          color="primary"
          onClick={handleModalSave}
          disabled = {modalLoading}
          >
            {modalLoading ? 'Carregando' : 'Salvar'}</CButton>
          <CButton
          color="secondary"
          onClick={handleCloseModal}
          disabled = {modalLoading}
          >Cancelar</CButton>
        </CModalFooter>
      </CModal>



      </>
  );
}
