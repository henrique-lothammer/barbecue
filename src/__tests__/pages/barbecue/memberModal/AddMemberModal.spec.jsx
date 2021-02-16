import React from 'react';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import MemberModal from '../../../../pages/barbecue/memberModal';
import api from '../../../../services/api';

describe('Add member modal page', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be able to create a member', async () => {
    const {
      getByLabelText, getByText,
    } = render(
      <MemberModal
        modalMemberVisibility
        setModalMemberVisibility={() => {}}
        setIsMembersChanged={() => {}}
        barbecueId="1"
        member={{}}
      />,
    );

    const nameField = getByLabelText('Nome');
    const buttonElement = getByText('Adicionar');

    fireEvent.change(nameField, { target: { value: 'Name Example' } });

    fireEvent.click(buttonElement);

    const apiPost = jest.spyOn(api, 'post').mockImplementation(() => {});

    await waitFor(() => {});
    expect(apiPost).toHaveBeenCalled();
  });

  it('should not be able to create a member with invalid data', async () => {
    const {
      getByLabelText, getByText,
    } = render(
      <MemberModal
        modalMemberVisibility
        setModalMemberVisibility={() => {}}
        setIsMembersChanged={() => {}}
        barbecueId="1"
        member={{}}
      />,
    );

    const nameField = getByLabelText('Nome');
    const buttonElement = getByText('Adicionar');

    fireEvent.change(nameField, { target: { value: '' } });

    fireEvent.click(buttonElement);

    const apiPost = jest.spyOn(api, 'post').mockImplementation(() => {});
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
        member={{}}
      />,
    );

    const nameField = getByLabelText('Nome');
    const buttonElement = getByText('Adicionar');

    fireEvent.change(nameField, { target: { value: 'Name Example' } });

    fireEvent.click(buttonElement);

    jest.spyOn(api, 'post').mockImplementation(() => { throw Error(); });
    await waitFor(() => {
      expect(getByText('Falha ao executar, por favor tente mais tarde.')).toBeTruthy();
    });
  });
});
