import './Footer.css';
import { FormattedMessage } from 'react-intl';

function Footer() {
  return (
    <footer className="footer text-center mt-4">
      <p>
        <FormattedMessage id="footer.contact" defaultMessage="Contact us: +57 3102105253 – info@robot-lovers.com – @robot-lovers" />
      </p>
    </footer>
  );
}

export default Footer;
