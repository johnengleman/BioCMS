import Navigation from '../Navigation/Navigation';

type Props = {
  children: JSX.Element;
};

const Page = ({ children }: Props) => (
  <div className='min-h-screen'>
    <Navigation />
    <main className='flex flex-row flex-wrap gap-4 mx-auto w-4/5'>
      {children}
    </main>
  </div>
);

export default Page;
