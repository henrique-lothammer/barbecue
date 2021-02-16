import React from 'react';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import MemberModal from '../../../../pages/barbecue/memberModal';
import api from '../../../../services/api';

describe('Edit member modal page', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be able to edit a member', async () => {
    const {
      getByLabelText, getByText,
    } = render(
      <MemberModal
        modalMemberVisibility
        setModalMemberVisibility={() => {}}
        setIsMembersChanged={() => {}}
        barbecueId="1"
        member={{
          id: 1,
          name: 'johndoe',
          budget: 10,
          need_drink: 'true',
          paid: 1,
        }}
      />,
    );

    const nameField = getByLabelText('Nome');
    const buttonElement = getByText('Salvar alterações');

    fireEvent.change(nameField, { target: { value: 'Another Name Example' } });

    fireEvent.click(buttonElement);

    const apiPost = jest.spyOn(api, 'put').mockImplementation(() => {});

    await waitFor(() => {});
    expect(apiPost).toHaveBeenCalled();
  });

  it('should not be able to edit a member with invalid data', async () => {
    const {
      getByLabelText, getByText,
    } = render(
      <MemberModal
        modalMemberVisibility
        setModalMemberVisibility={() => {}}
        setIsMembersChanged={() => {}}
        barbecueId="1"
        member={{
          id: 1,
          name: 'johndoe',
          budget: 10,
          need_drink: 'true',
          paid: 1,
        }}
      />,
    );

    const nameField = getByLabelText('Nome');
    const buttonElement = getByText('Salvar alterações');

    fireEvent.change(nameField, { target: { value: '' } });

    fireEvent.click(buttonElement);

    const apiPost = jest.spyOn(api, 'put').mockImplementation(() => {});
    await waitFor(() => {});
    expect(apiPost).not.toHaveBeenCalled();
  });

  it('should display an error if save fails', async () => {
    const {
      getByLabelText, getByText,
    } = render(
      <MemberModal
        modalMemberVisibility
        setModalMemberVisibility={() => {}}
        setIsMembersChanged={() => {}}
        barbecueId="1"
        member={{
          id: 1,
          name: 'johndoe',
          budget: 10,
          need_drink: 'true',
          paid: 1,
        }}
      />,
    );

    const nameField = getByLabelText('Nome');
    const buttonElement = getByText('Salvar alterações');

    fireEvent.change(nameField, { target: { value: 'Name Example' } });

    fireEvent.click(buttonElement);

    jest.spyOn(api, 'put').mockImplementation(() => { throw Error(); });
    await waitFor(() => {
      expect(getByText('Falha ao executar, por favor tente mais tarde.')).toBeTruthy();
    });
  });
});
