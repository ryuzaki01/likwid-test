import Link from "next/link";

const LinkRenderer = (props: any) => {
  return (
    <Link href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </Link>
  );
}

export default LinkRenderer;