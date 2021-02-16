import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import CreateBarbecue from '../../../../pages/dashboard/createBarbecue';
import api from '../../../../services/api';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  Link: () => {},
}));

describe('create barbecue page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to create a barbecue', async () => {
    const { getByLabelText, getByText } = render(
      <CreateBarbecue
        modalCreateVisibility
        setModalCreateVisibility={() => {}}
      />,
    );
    jest.spyOn(api, 'post').mockImplementation(() => ({
      data:
      {
        id: 1,
      },
    }));

    const titleField = getByLabelText('Título');
    const dateField = getByLabelText('Data e horário');
    const buttonElement = getByText('Adicionar');

    fireEvent.change(titleField, { target: { value: 'Title example' } });
    fireEvent.change(dateField, { target: { value: '2021-02-10T14:04' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/barbecue/1');
    });
  });

  it('should not be able to create a barbecue with invalid data', async () => {
    const { getByLabelText, getByText } = render(
      <CreateBarbecue
        modalCreateVisibility
        setModalCreateVisibility={() => {}}
      />,
    );
    jest.spyOn(api, 'post').mockImplementation(() => ({
      data:
      {
        id: 1,
      },
    }));

    const titleField = getByLabelText('Título');
    const dateField = getByLabelText('Data e horário');
    const buttonElement = getByText('Adicionar');

    fireEvent.change(titleField, { target: { value: '' } });
    fireEvent.change(dateField, { target: { value: '' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if save fails', async () => {
    const { getByLabelText, getByText } = render(
      <CreateBarbecue
        modalCreateVisibility
        setModalCreateVisibility={() => {}}
      />,
    );
    jest.spyOn(api, 'post').mockImplementation(() => { throw Error(); });

    const titleField = getByLabelText('Título');
    const dateField = getByLabelText('Data e horário');
    const buttonElement = getByText('Adicionar');

    fireEvent.change(titleField, { target: { value: 'Title example' } });
    fireEvent.change(dateField, { target: { value: '2021-02-10T14:04' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(getByText('Falha ao salvar, por favor tente novamente mais tarde.')).toBeTruthy();
    });
  });
});
