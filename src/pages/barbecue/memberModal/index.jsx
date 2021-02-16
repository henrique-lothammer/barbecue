import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import api from '../../../services/api';

import LoaderSvg from '../../../assets/loader.svg';

import {
  Input, Button, Label, Select,
} from '../../../styles/form';
import {
  Overlay, Wrapper, ReturnBox, Error,
} from '../../../styles/modal';

const MemberModal = ({
  modalMemberVisibility,
  setModalMemberVisibility,
  setIsMembersChanged,
  barbecueId,
  suggestedBudget,
  suggestedBudgetNoDrink,
  member,
}) => {
  const { register, handleSubmit, setValue } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);

  const createNewMember = useCallback(async (data) => {
    setSubmitting(true);
    await api.post(`/barbecue/${barbecueId}/members/`,
      { barbecue_id: barbecueId, ...data });
  });

  const editMember = useCallback(async (data) => {
    setSubmitting(true);
    await api.put(`/barbecue/members/${member.id}`,
      { barbecue_id: barbecueId, ...data });
  }, [member]);

  const handleOnSubmit = useCallback(async (data) => {
    try {
      setServerError(false);
      if (member.id) {
        await editMember(data);
      } else {
        await createNewMember(data);
      }
      setSubmitting(false);
      setIsMembersChanged(true);
      setModalMemberVisibility(false);
    } catch (error) {
      setServerError(true);
      setSubmitting(false);
    }
  }, [member]);

  const handleDelete = useCallback(async () => {
    try {
      setSubmitting(true);
      await api.delete(`/barbecue/members/${member.id}`);
      setSubmitting(false);
      setIsMembersChanged(true);
      setModalMemberVisibility(false);
    } catch (error) {
      setServerError(true);
      setSubmitting(false);
    }
  }, [member]);

  const handleChangeDrink = useCallback((value) => {
    if (!member.id) {
      if (Number(value)) {
        setValue('budget', suggestedBudget);
      } else {
        setValue('budget', suggestedBudgetNoDrink);
      }
    }
  });

  useEffect(() => {
    if (modalMemberVisibility) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'unset'; }
    setServerError(false);
    setValue('name', member?.name);
    setValue('budget', member?.budget);
    setValue('need_drink', member?.need_drink ? member?.need_drink : 0);
    setValue('paid', member?.paid ? member.paid : 0);
    handleChangeDrink(member?.need_drink);
  }, [modalMemberVisibility, member]);

  return (
    <>
      {modalMemberVisibility
      && (
      <Overlay data-testid="modal-overlay">
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
            <h1>
              {member.id ? 'Editar' : 'Adicionar' }
              {' '}
              Membro
            </h1>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <Label htmlFor="create-name">Nome</Label>
              <Input ref={register({ required: true })} name="name" id="create-name" placeholder="Digite o nome" required />

              <Label htmlFor="create-drink">Bebida inclusa</Label>
              <Select ref={register} name="need_drink" id="create_drink" onChange={(e) => handleChangeDrink(e.target.value)}>
                <option value="1" checked>Sim</option>
                <option value="0">Não</option>
              </Select>

              <Label htmlFor="create-budget">Contribuição</Label>
              <Input ref={register} type="number" name="budget" id="create-budget" placeholder="Digite a contribuição. Ex: 10" />

              <input ref={register} type="hidden" name="paid" />

              <ReturnBox>
                { serverError && <Error>Falha ao executar, por favor tente mais tarde.</Error>}
                <img src={LoaderSvg} alt="loader" className={submitting ? 'active' : ''} />
              </ReturnBox>

              <Button type="submit" disabled={submitting ? 'disabled' : ''}>
                {member.id ? 'Salvar alterações' : 'Adicionar' }
              </Button>
              {member.id && <Button type="button" onClick={handleDelete}>Apagar</Button> }
              <Button type="button" onClick={() => setModalMemberVisibility(false)}>Cancelar</Button>
            </form>
          </Wrapper>
        </motion.div>
      </Overlay>
      )}
    </>
  );
};

MemberModal.propTypes = {
  modalMemberVisibility: PropTypes.bool.isRequired,
  setModalMemberVisibility: PropTypes.func.isRequired,
  setIsMembersChanged: PropTypes.func.isRequired,
  barbecueId: PropTypes.number.isRequired,
  suggestedBudget: PropTypes.number.isRequired,
  suggestedBudgetNoDrink: PropTypes.number.isRequired,
  member: PropTypes.oneOfType(
    [
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        budget: PropTypes.number,
        need_drink: PropTypes.number,
        paid: PropTypes.number,
      }),
      PropTypes.shape({}),
    ],
  ).isRequired,
};

export default MemberModal;
