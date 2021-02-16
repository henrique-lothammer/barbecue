import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../../services/api';

import {
  MemberContainer, MemberName, MemberBudget, PayToggle, Error,
} from './style';

const Member = ({
  member,
  setMemberToEdit,
  setModalMemberVisibility,
  setIsLoadingMembers,
  getBarbecueMembers,
}) => {
  const [serverError, setServerError] = useState(false);

  const handleEditModal = useCallback(() => {
    setMemberToEdit(member);
    setModalMemberVisibility(true);
  });

  const togglePaid = useCallback(async (id, paid) => {
    try {
      setIsLoadingMembers(true);
      await api.put(`/barbecue/members/${id}/paid`, { id, paid: !paid });
      getBarbecueMembers();
    } catch (error) {
      setServerError(true);
      setIsLoadingMembers(false);
    }
  });

  return (
    <MemberContainer key={member.id}>
      <div className="left">
        <PayToggle onClick={() => togglePaid(member.id, member.paid)} paid={member.paid} data-testid="button-toggle" title="Setar pagamento" />
        { serverError && <Error>Erro!</Error>}
        <MemberName type="button" onClick={() => handleEditModal(member)} title="Editar">{member.name}</MemberName>
      </div>
      <div className="right">
        <MemberBudget type="button" onClick={() => handleEditModal(member)} title="Editar">
          <span>
            {member.paid ? (
              <strike>
                R$
                {member.budget.toFixed(2).toString().replace('.', ',')}
              </strike>
            ) : (
              `R$${member.budget.toFixed(2).toString().replace('.', ',')} `
            )}
          </span>
        </MemberBudget>
      </div>
    </MemberContainer>
  );
};

Member.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    budget: PropTypes.number,
    need_drink: PropTypes.number,
    paid: PropTypes.number,
  }).isRequired,
  setMemberToEdit: PropTypes.func.isRequired,
  setModalMemberVisibility: PropTypes.func.isRequired,
  setIsLoadingMembers: PropTypes.func.isRequired,
  getBarbecueMembers: PropTypes.func.isRequired,
};

export default Member;
