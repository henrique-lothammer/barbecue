import React, { useCallback, useEffect, useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';
import { formatDateSmall } from '../../utils/date';

import CreateBarbecue from './createBarbecue';

import iconPeople from '../../assets/icon-people.svg';
import iconMoney from '../../assets/icon-money.svg';
import iconAddBarbecue from '../../assets/icon-barbecue.svg';
import {
  Barbecue, BarbecuesWrapper, LinkContainer, Error, AddBarbecue,
} from './style';

const Dashboard = () => {
  const [barbecues, setBarbecues] = useState([]);
  const [modalCreateVisibility, setModalCreateVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const getBarbecues = useCallback(async () => {
    try {
      setIsLoading(true);
      const barbecuesList = await api.get('/barbecues');
      setBarbecues(barbecuesList.data);
      setIsLoading(false);
    } catch (error) {
      setServerError(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getBarbecues();
  }, [getBarbecues]);

  return (
    <>
      <Header title="Agenda de Churras" />
      <main>
        <div className="container">
          <BarbecuesWrapper isLoading={isLoading}>
            { barbecues.map((barbecue) => (
              <Barbecue key={barbecue.id}>
                <LinkContainer to={`/barbecue/${barbecue.id}`} title="Ver churrasco">
                  <div className="event">
                    <span className="date">{formatDateSmall(barbecue.date)}</span>
                    <span className="title">{barbecue.title}</span>
                  </div>
                  <div className="stats">
                    <span className="members">
                      <img src={iconPeople} alt="icon-members" />
                      {barbecue.members}
                    </span>
                    <span className="budget">
                      <img src={iconMoney} alt="icon-budget" />

                      R$
                      {barbecue?.total_budget ? barbecue.total_budget : 0 }
                    </span>
                  </div>
                </LinkContainer>
              </Barbecue>
            ))}
            { serverError
              && <Error>Falha ao carregar, por favor tente novamente mais tarde.</Error>}
            <AddBarbecue onClick={() => setModalCreateVisibility(true)} title="Adicionar churrasco">
              <img src={iconAddBarbecue} alt="icon-add-barbecue" />
              <h1>Adicionar Churras</h1>
            </AddBarbecue>

          </BarbecuesWrapper>
        </div>
      </main>
      <CreateBarbecue
        modalCreateVisibility={modalCreateVisibility}
        setModalCreateVisibility={setModalCreateVisibility}
      />
      <Footer />
    </>
  );
};

export default Dashboard;
