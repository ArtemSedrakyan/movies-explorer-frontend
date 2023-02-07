import { footerLinks } from '../../utils/constants';
import FooterLink from '../FooterLink/FooterLink';

function Footer() {
  return (
    <footer className="footer page__element">
        <p className="footer__sign">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__nav-block">
          <p className="footer__copyright">&copy; 2022</p>
          <ul className="footer__links">
            {footerLinks.map((element) => {
              return (
                <FooterLink key = {element.id} item = {element} />
              );
            })}
          </ul>
        </div>
    </footer>
  );
}

export default Footer;
