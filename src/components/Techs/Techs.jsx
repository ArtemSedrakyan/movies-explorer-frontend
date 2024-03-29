function Techs() {
  return (
    <section className="main__container page__element techs">
      <h2 className="main__heading">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__title">7 Технологий</h3>
        <p className="techs__paragraph">
          На курсе веб-разработки мы освоили технологии,
          которые применили в дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__list-element">HTML</li>
          <li className="techs__list-element">CSS</li>
          <li className="techs__list-element">JS</li>
          <li className="techs__list-element">React</li>
          <li className="techs__list-element">Git</li>
          <li className="techs__list-element">Express.js</li>
          <li className="techs__list-element">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
