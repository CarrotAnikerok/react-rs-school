import type { Submission } from '../../hooks/create';
import './Card.css';

type CardProps = {
  submission: Submission;
};

export default function Card({ submission }: CardProps) {
  return (
    <div className="card">
      <h1>{submission.name}</h1>
      <div className="data-wrapper">
        <div className="data-wrapper-text">
          <div className="block">
            <div className="element">
              <p className="title">Age</p>
              <p>{submission.age}</p>
            </div>
            <div className="element">
              <p className="title">Email</p>
              <p>{submission.email}</p>
            </div>
          </div>
          <div className="block">
            <div className="element">
              <p className="title">Gender</p>
              <p>{submission.gender}</p>
            </div>
            <div className="element">
              <p className="title">Password</p>
              <p>{submission.password}</p>
            </div>
          </div>
          <div className="element">
            <p className="title">Country</p>
            <p>{submission.country}</p>
          </div>
        </div>
        <div className="element">
          <img src={submission.picture}></img>
        </div>
      </div>
    </div>
  );
}
