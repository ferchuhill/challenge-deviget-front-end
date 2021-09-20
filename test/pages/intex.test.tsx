import React from 'react';
import { render } from '../testUtils';
import { Home } from '../../pages/index';
import { Post } from '../../components/post';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialState } from '../fixtures/posts';
import { postUnread, postRead } from '../fixtures/post';

describe('Home page', () => {
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
      {}
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('show Post unread', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Post post={postUnread} />
      </Provider>
    );
    expect(asFragment()).toEqual(expect.not.stringMatching('new'));
  });
  it('show Post read', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Post post={postRead} />
      </Provider>
    );
    expect(asFragment()).toEqual(expect.not.stringMatching('new'));
  });
});
