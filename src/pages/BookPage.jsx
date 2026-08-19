import { useNavigate } from 'react-router-dom'
import BookMode from '../components/book/BookMode'

export default function BookPage() {
  const navigate = useNavigate()
  return <BookMode onClose={() => navigate('/')} />
}
