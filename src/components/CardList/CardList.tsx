import Card from "../Card/Card"
import type { Submission } from "../schemas/submissions"
import './CardList.css'

type CardProps = {
    submissions: Submission[]
}

export default function CardList({ submissions }: CardProps) {
  return (
    <>
        <h1>Form Submits</h1>
        <div className='card-list'>
        {submissions.map((element) => {
            return (
                <Card
                key={element.name}
                submission={element}>
                </Card>
            )
        })}
    </div>
    </>
  )
}
