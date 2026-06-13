import Link from "next/link"
export default function Navbar(){
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/new">Write</Link>
        </li>
        <li>
          <Link href="/signin">Sign in</Link>
        </li>
      </ul>
    </nav>
  );
}