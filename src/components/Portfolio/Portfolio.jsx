function Portfolio(props) {
  return(
    <li className="about-me__portfolio_type_link-el">
      <a className="about-me__portfolio_type_link" href={props.item.link}
      target="_blank" rel="noopener noreferrer">
        {props.item.title}
        <span className="about-me__portfolio_type_icon">&uarr;</span>
      </a>
    </li>
  );
}

export default Portfolio;
