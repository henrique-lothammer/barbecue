import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Member from './member';
import api from '../../services/api';
import { formatDateTime } from '../../utils/date';

import MemberModal from './memberModal';

import iconPeople from '../../assets/icon-people.svg';
import iconMoney from '../../assets/icon-money.svg';

import { Button, ButtonLink } from '../../styles/form';
import {
  BarbecueContainer, MembersContainer, DrinkTitleContainer, Error,
} from './style';

const Barbecue = () => {
  const { params } = useRouteMatch();
  const [barbecue, setBarbecue] = useState();
  const [barbecueMembers, setBarbecueMembers] = useState([]);

  const [memberToEdit, setMemberToEdit] = useState({});

  const [isMembersChanged, setIsMemebersChanged] = useState(false);
  const [isLoadingBarbecues, setIsLoadingBarbecues] = useState(false);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [modalMemberVisibility, setModalMemberVisibility] = useState(false);

  const [serverError, setServerError] = useState(false);

  const getBarbecueMembers = useCallback(async () => {
    try {
      setIsLoadingMembers(true);
      const members = await api.get(`/barbecue/${params.id}/members/`);
      setBarbecueMembers(members.data);
      setIsLoadingMembers(false);
    } catch (error) {
      setServerError(true);
      setIsLoadingMembers(false);
    }
  }, []);

  const getBarbecue = useCallback(async () => {
    try {
      setIsLoadingBarbecues(true);
      const barbecueDetails = await api.get(`/barbecues/${params.id}`);
      setBarbecue(barbecueDetails.data);
      setIsLoadingBarbecues(false);

      getBarbecueMembers();
    } catch (error) {
      setServerError(true);
      setIsLoadingMembers(false);
    }
  }, []);

  useEffect(() => {
    getBarbecue();
  }, []);

  useEffect(() => {
    if (!modalMemberVisibility) {
      setMemberToEdit({});
    }
    if (isMembersChanged) {
      getBarbecue();
      getBarbecueMembers();
      setIsMemebersChanged(false);
    }
  }, [modalMemberVisibility]);

  const handleCreateModal = useCallback(() => {
    setModalMemberVisibility(true);
  });

  return (
    <>
      <Header title="Agenda de Churras" />
      <main>
        <div className="container">
          <BarbecueContainer isLoading={isLoadingBarbecues}>
            {barbecue && (
              <>
                <div className="details">
                  <div className="event">
                    <span className="date">{barbecue.date && formatDateTime(barbecue.date)}</span>
                    <span className="title">{barbecue.title}</span>
                  </div>
                  <div className="stats">
                    <span className="members">
                      <img src={iconPeople} alt="icon-members" />
                      {barbecue.members ? barbecue.members : 0 }
                    </span>
                    <span className="budget">
                      <img src={iconMoney} alt="icon-budget" />
                      R$
                      {barbecue.total_budget ? barbecue.total_budget : 0 }
                    </span>
                  </div>
                </div>
                <div className="text">
                  <p>{barbecue.description}</p>
                  <p>{barbecue.notes}</p>
                </div>
              </>
            )}
            <MembersContainer isLoading={isLoadingMembers}>
              { barbecueMembers[0] && barbecueMembers[0].length > 0
              && <DrinkTitleContainer>Com Bebida</DrinkTitleContainer>}
              { barbecueMembers[0]
                && barbecueMembers[0].map((member) => (
                  <Member
                    key={member.id}
                    member={member}
                    setMemberToEdit={setMemberToEdit}
                    setModalMemberVisibility={setModalMemberVisibility}
                    setIsLoadingMembers={setIsLoadingMembers}
                    getBarbecueMembers={getBarbecueMembers}
                  />
                ))}
              { barbecueMembers[1] && barbecueMembers[1].length > 0
              && <DrinkTitleContainer>Sem Bebida</DrinkTitleContainer>}
              { barbecueMembers[1]
                && barbecueMembers[1].map((member) => (
                  <Member
                    key={member.id}
                    member={member}
                    setMemberToEdit={setMemberToEdit}
                    setModalMemberVisibility={setModalMemberVisibility}
                    setIsLoadingMembers={setIsLoadingMembers}
                    getBarbecueMembers={getBarbecueMembers}
                  />
                ))}
            </MembersContainer>
            <Button type="button" onClick={handleCreateModal}>Adicionar membro</Button>
            <ButtonLink type="button" to="/">Ver todos churrascos</ButtonLink>
          </BarbecueContainer>
          { serverError && <Error>Falha ao carregar, por favor tente mais tarde.</Error>}
        </div>
      </main>
      {barbecue && (
        <MemberModal
          modalMemberVisibility={modalMemberVisibility}
          setModalMemberVisibility={setModalMemberVisibility}
          setIsMembersChanged={setIsMemebersChanged}
          barbecueId={barbecue.id}
          suggestedBudget={barbecue.suggested_budget ? barbecue.suggested_budget : 0}
          suggestedBudgetNoDrink={
            barbecue.suggested_budget_no_drink ? barbecue.suggested_budget_no_drink : 0
          }
          member={memberToEdit}
        />
      )}

      <Footer />
    </>
  );
};

export default Barbecue;
