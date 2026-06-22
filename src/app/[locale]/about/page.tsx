import Link from 'next/link';
import './About.css';

export default function About() {
  return (
    <div className="about">
      <p>Hello! I&apos;m Carrot and  author of this website!</p>
      <p>My github: CarrotAnikerok</p>
      <p>My discord: carrotanikerok</p>
      <p>
        from <Link href="https://rs.school/courses/reactjs">react school course</Link>
        !
      </p>
    </div>
  );
}
