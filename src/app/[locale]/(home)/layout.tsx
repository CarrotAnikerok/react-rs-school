import './Home.css';

type SearchLayoutProps = {
  children: React.ReactNode;
  details: React.ReactNode;
};

export default function SearchLayout({ children, details }: SearchLayoutProps) {
  return (
    <div className="home">
      <div className="list-part">
        {children}
      </div>

      <div className="details">
        {details}
      </div>
    </div>
  );
}
