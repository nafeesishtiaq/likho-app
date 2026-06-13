import Link from "next/link"
export default function Navbar(){
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/write">Write</Link>
        </li>
        <li>
          <Link href="/login">Sign in</Link>
        </li>
      </ul>
    </nav>
  );
}