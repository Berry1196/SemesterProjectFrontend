import { Link } from 'react-router-dom'

export default function LogInButton() {
  return (
    <div className='hidden sm:ml-6 sm:block'>
      <Link to='/login' className='rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'>
        Log ind
      </Link>
    </div>
  )
}
