import promoLogo from '../../images/landing-logo.svg';

function Promo() {
  return (
    <section className='promo page__element'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className='promo__logo' src={promoLogo} alt='промо логотип' />
    </section>
  );
}

export default Promo;
