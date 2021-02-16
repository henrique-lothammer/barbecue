import React from 'react';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import MemberModal from '../../../../pages/barbecue/memberModal';
import api from '../../../../services/api';

describe('Delete member modal page', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be able to delete a member', async () => {
    const {
      getByText,
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
    const apiPost = jest.spyOn(api, 'delete').mockImplementation(() => { });

    const buttonElement = getByText('Apagar');

    fireEvent.click(buttonElement);

    await waitFor(() => {
    });
    expect(apiPost).toHaveBeenCalled();
  });

  it('should display an error if delete fails', async () => {
    const {
      getByText,
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
    jest.spyOn(api, 'delete').mockImplementation(() => { throw Error(); });

    const buttonElement = getByText('Apagar');

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(getByText('Falha ao executar, por favor tente mais tarde.')).toBeTruthy();
    });
  });
});
