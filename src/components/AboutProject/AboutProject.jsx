function AboutProject() {
  return (
    <section className="main__container page__element description">
        <h2 className="main__heading">О проекте</h2>
        <div className="description__container">
          <div className="description__container_type_text">
            <article>
              <h3 className="desription__title">Дипломный проект включал 5 этапов</h3>
              <p className="description__paragraph">
                Составление плана, работу над бэкендом, вёрстку,
                добавление функциональности и финальные доработки.
              </p>
            </article>
            <article>
              <h3 className="desription__title">На выполнение диплома ушло 5 недель</h3>
              <p className="description__paragraph">
                У каждого этапа был мягкий и жёсткий дедлайн,
                которые нужно было соблюдать, чтобы успешно защититься.
              </p>
            </article>
          </div>
          <div className="description__container_type_schema">
            <div className="description__scale">1 неделя</div>
            <div className="description__scale">4 недели</div>
            <div className="description__scale-sign">Back-end</div>
            <div className="description__scale-sign">Front-end</div>
          </div>
        </div>
    </section>

  );
}

export default AboutProject;
