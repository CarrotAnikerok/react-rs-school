import type { Submission } from "../schemas/submissions"
import './Card.css'

type CardProps = {
    submission: Submission
}

export default function Card({ submission }: CardProps) {
    console.log('Submission' + JSON.stringify(submission));
    return (
        <div className="card">
            <h1>CardInfo</h1>
            <div className='data-wrapper'>
                <p>Name: {submission.name}</p>
                <p>Age: {submission.age}</p>
                <p>Gender: {submission.gender}</p>
            </div>
        </div>
  )
}
