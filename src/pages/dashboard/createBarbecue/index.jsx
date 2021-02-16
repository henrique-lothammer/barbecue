import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import api from '../../../services/api';

import LoaderSvg from '../../../assets/loader.svg';

import {
  Input, Button, TextArea, Label,
} from '../../../styles/form';
import {
  Overlay, Wrapper, ReturnBox, Error,
} from '../../../styles/modal';

const CreateBarbecue = ({ modalCreateVisibility, setModalCreateVisibility }) => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleOnSubmit = useCallback(async (data) => {
    try {
      setServerError(false);
      setSubmitting(true);
      const resp = await api.post('/barbecues', data);
      setSubmitting(false);
      history.push(`/barbecue/${resp.data.id}`);
    } catch (error) {
      setServerError(true);
      setSubmitting(false);
    }
  }, []);

  useEffect(() => {
    setServerError(false);
    if (modalCreateVisibility) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'unset'; }
  }, [modalCreateVisibility]);

  return (
    <>
      {modalCreateVisibility
      && (
      <Overlay>
        <motion.div
          className="container"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              opacity: 0,
              y: '-100%',
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
        >
          <Wrapper>
            <h1>Adicionar Churras</h1>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <Label htmlFor="create-title">Título</Label>
              <Input ref={register({ required: true })} name="title" id="create-title" placeholder="Digite o título" required />

              <Label htmlFor="create-budget-drink">Contribuição sugerida s/ bebida</Label>
              <Input ref={register} type="number" name="suggested_budget_no_drink" id="create-budget-drink" placeholder="Digite a contribuição sugerida. Ex: 20" />

              <Label htmlFor="create-budget">Contribuição sugerida c/ bebida</Label>
              <Input ref={register} type="number" name="suggested_budget" id="create-budget" placeholder="Digite a contribuição sugerida. Ex: 30" />

              <Label htmlFor="create-date">Data e horário</Label>
              <Input ref={register({ required: true })} type="datetime-local" name="date" id="create-date" required />

              <Label htmlFor="create-description">Descrição</Label>
              <TextArea ref={register} name="description" id="create-description" placeholder="Digite uma descrição" rows="3" />

              <Label htmlFor="create-notes">Observações adicionais</Label>
              <TextArea ref={register} name="notes" id="create-notes" placeholder="Digite uma observação" rows="3" />

              <ReturnBox>
                { serverError
                && <Error>Falha ao salvar, por favor tente novamente mais tarde.</Error>}
                <img src={LoaderSvg} alt="loader" className={submitting ? 'active' : ''} />
              </ReturnBox>

              <Button
                type="submit"
                disabled={submitting ? 'disabled' : ''}
              >
                Adicionar
              </Button>
              <Button type="button" onClick={() => setModalCreateVisibility(false)}>Cancelar</Button>
            </form>
          </Wrapper>
        </motion.div>
      </Overlay>
      )}
    </>
  );
};

CreateBarbecue.propTypes = {
  modalCreateVisibility: PropTypes.bool.isRequired,
  setModalCreateVisibility: PropTypes.func.isRequired,
};

export default CreateBarbecue;
