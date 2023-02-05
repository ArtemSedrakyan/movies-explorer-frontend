import { portfolioLinks } from '../../utils/constants';
import Portfolio from '../Portfolio/Portfolio';
import portrait from '../../images/portrait.jpg';

function AboutMe() {
  return (
    <section className="main__container page__element about-me">
      <h2 className="main__heading">Студент</h2>
      <div className="about-me__container">
        <img className="about-me__photo" src={portrait} alt="фото Артем"></img>
        <article className="about-me__text">
          <h3 className="about-me__text_type_name">Виталий</h3>
          <p className="about-me__text_type_info">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text_type_paragraph">
            Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами
            и ушёл с постоянной работы.
          </p>
          <a className="about-me__text_type_link" href="https://github.com/ArtemSedrakyan">Github</a>
        </article>
      </div>
      <article className="about-me__portfolio">
        <h4 className="about-me__portfolio_type_heading">Портфолио</h4>
        <ul className="about-me__portfolio_type_links">
          {portfolioLinks.map((element) => {
            return (
              <Portfolio key = {element.id} item = {element} />
            );
          })}
        </ul>
      </article>
    </section>
  );
}

export default AboutMe;
