function FooterLink(props) {
  return (
    <li>
      <a className="footer__link" href={props.item.link}>
        {props.item.title}
      </a>
    </li>
  );
}

export default FooterLink;
