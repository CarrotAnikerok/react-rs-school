import type { Submission } from "../../hooks/create";
import './Card.css'

type CardProps = {
    submission: Submission
}

export default function Card({ submission }: CardProps) {
    return (
        <div className="card">
            <h1>Submitted</h1>
            <div className='data-wrapper'>
                <p>Name: {submission.name}</p>
                <p>Age: {submission.age}</p>
                <p>Gender: {submission.gender}</p>
                <p>Image: </p>
                <img src={submission.picture}></img>
            </div>
        </div>
  )
}
