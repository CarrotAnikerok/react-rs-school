import type { Submission } from "../../hooks/create"
import Card from "../Card/Card"
import './CardList.css'

type CardProps = {
    submissions: Submission[]
}

export default function CardList({ submissions }: CardProps) {
  return (
    <>
        <h1>Form Submits</h1>
        <div className='card-list'>
        {submissions.map((element, index) => {
            return (
                <Card
                    key={index}
                    submission={element}>
                </Card>
            )
        })}
    </div>
    </>
  )
}
