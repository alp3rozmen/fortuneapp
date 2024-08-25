import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { IntlProvider } from 'react-intl';
import tr from './locales/tr-tr.json';

const InjectMassage = props =><IntlProvider locale='tr' messages={tr}><FormattedMessage {...props} /> </IntlProvider>;


export default injectIntl(InjectMassage, {
  withRef: false,});
