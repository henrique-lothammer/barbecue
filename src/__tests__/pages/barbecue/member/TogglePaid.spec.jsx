import React from 'react';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import Member from '../../../../pages/barbecue/member';
import api from '../../../../services/api';

describe('Member page', () => {
  it('should be able to toggle members paid', async () => {
    const {
      getByTestId,
    } = render(
      <Member
        member={{
          id: 1,
          name: 'johndoe',
          budget: 10,
          need_drink: 'true',
          paid: 1,
        }}
        setMemberToEdit={() => {}}
        setModalMemberVisibility={() => {}}
        setIsLoadingMembers={() => {}}
        getBarbecueMembers={() => {}}
      />,
    );
    const apiPost = jest.spyOn(api, 'put').mockImplementation(() => { });
    const toggleButton = getByTestId('button-toggle');

    fireEvent.click(toggleButton);

    await waitFor(() => {});
    expect(apiPost).toHaveBeenCalled();
  });

  it('should show an error if toggle members paid fails', async () => {
    const {
      getByTestId, getByText,
    } = render(
      <Member
        member={{
          id: 1,
          name: 'johndoe',
          budget: 10,
          need_drink: 'true',
          paid: 1,
        }}
        setMemberToEdit={() => {}}
        setModalMemberVisibility={() => {}}
        setIsLoadingMembers={() => {}}
        getBarbecueMembers={() => {}}
      />,
    );
    jest.spyOn(api, 'put').mockImplementation(() => { throw Error(); });
    const toggleButton = getByTestId('button-toggle');

    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(getByText('Erro!')).toBeTruthy();
    });
  });
});
