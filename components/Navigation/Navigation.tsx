import Link from 'next/link';

const Navigation = () => {
  return (
    <div className='shadow-lg mb-4'>
      <div className='w-4/5 mx-auto flex items-center h-14'>
        <ul className='flex gap-8'>
          <li className='text-[#464646] transition-all opacity-70 text-base cursor-pointer rounded border border-transparent hover:border-slate-300 hover:opacity-100 py-1 px-6'>
            <Link href='/saints'>
              <a>Saints</a>
            </Link>
          </li>
          <li className='text-[#464646] transition-all opacity-70 text-base cursor-pointer rounded border border-transparent hover:border-slate-300 hover:opacity-100 py-1 px-6'>
            <Link href='/quotes'>
              <a>Quotes</a>
            </Link>
          </li>
          <li className='text-[#464646] transition-all opacity-70 text-base cursor-pointer rounded border border-transparent hover:border-slate-300 hover:opacity-100 py-1 px-6'>
            <Link href='/books'>
              <a>Books</a>
            </Link>
          </li>
          <li className='text-[#464646] transition-all opacity-70 text-base cursor-pointer rounded border border-transparent hover:border-slate-300 hover:opacity-100 py-1 px-6'>
            <Link href='/churches'>
              <a>Churches</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
