import Link from "next/link";
import "@/components/client/Header/header.scss";

const Header = () => {
  return (
    <header>
      <div className="project-title">
        <Link href="/">
          <h1>
            Player<span>Orbit</span>
          </h1>
          <h1>Courses</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
