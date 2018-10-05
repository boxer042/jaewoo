// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { AuthActions, UserActions, BaseActions } from 'store/actionCreators';
import type { State } from 'store';
import AuthForm from 'components/landing/AuthForm';
import { pressedEnter } from 'lib/common';
import type { SocialAuthResult, VerifySocialResult, AuthResult } from 'store/modules/auth';
import storage, { keys } from 'lib/storage';

type Props = {
  email: string,
  sentEmail: boolean,
  sending: boolean,
  isUser: boolean,
  socialAuthResult: SocialAuthResult,
  verifySocialResult: VerifySocialResult,
  authResult: AuthResult,
  history: RouterHistory,
};

class AuthFormContainer extends Component<Props> {
  onEnterKeyPress = pressedEnter(() => {
    this.onSendVerification();
  })

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = e.target;
    AuthActions.setEmailInput(value);
  }

  onSendVerification = async (): Promise<*> => {
    const { email } = this.props;
    try {
      await AuthActions.sendAuthEmail(email);
    } catch (e) {
      console.log(e);
    }
  }

  onSocialLogin = async (provider: string) => {
    BaseActions.setFullscreenLoader(true);
    try {
      await AuthActions.socialLogin(provider);
    } catch (e) {
      BaseActions.setFullscreenLoader(false);
      return;
    }

    try {
      const { socialAuthResult } = this.props;
      if (!socialAuthResult) return;
      const { accessToken } = socialAuthResult;
      await AuthActions.verifySocial({ accessToken, provider });

      const { verifySocialResult } = this.props;
      if (!verifySocialResult) return;
      const { exists } = verifySocialResult;

      if (exists) { // exists = true => login
        await AuthActions.socialJwmLogin({ accessToken, provider });
        const { authResult } = this.props;

        if (!authResult) return;
        const { user } = authResult;

        UserActions.setUser(user);
        storage.set(keys.user, user);
      } else {
        const { email, name } = verifySocialResult;
        if (!email || !name) {
          console.log('?');
          return;
          // TODO
        }
        await AuthActions.autoCompleteRegisterForm({ email, name });
        this.props.history.push('/register');
      }
    } catch (e) {
      // TODO
    }
    BaseActions.setFullscreenLoader(false);
  }

  render() {
    const { onChange, onSendVerification, onEnterKeyPress, onSocialLogin } = this;
    const { email, sentEmail, sending, isUser } = this.props;

    return (
        <AuthForm
          isUser={isUser}
          email={email}
          onChange={onChange}
          sending={sending}
          sentEmail={sentEmail}
          onSendVerification={onSendVerification}
          onEnterKeyPress={onEnterKeyPress}
          onSocialLogin={onSocialLogin}
        />
    );
  }
}

export default connect(
  ({ auth, pender }: State) => ({
    email: auth.email,
    sentEmail: auth.sentEmail,
    isUser: auth.isUser,
    sending: pender.pending['auth/SEND_AUTH_EMAIL'],
    socialAuthResult: auth.socialAuthResult,
    verifySocialResult: auth.verifySocialResult,
    authResult: auth.authResult,
  }),
  () => ({}),
)(withRouter(AuthFormContainer));