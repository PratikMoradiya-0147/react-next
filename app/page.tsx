import Link from "next/link";
import Main from "./pages/main";

export default function Home() {
  return (
    <div className="container m-3">
      <div className="row">
      <Main/>
      

      <div className="position-absolute bottom-2">

      <Link href="/login" className="p-2 text-warning">Login</Link>
      <Link href="/ssr-users" className="p-2 text-warning">Users-SSR</Link>
      <Link href="/about" className="p-2 text-info">About</Link>
      <Link href="/service" className="p-2 text-info">Service</Link>
      <Link href="/hooks" className="p-2 text-info">Hooks</Link>
      <Link href="/profile" className="p-2 text-info">Profile</Link>
      <Link href="/user" className="text-info">User</Link>
      </div>
      </div>
    </div>
  );
}
