
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';

 
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
    <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
      
         
        <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
        <strong>Bem vindo </strong> Este é um exemplo de Crud em Next.js {' '}
        </p>
        <Link
          href="/invoices"
          className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Clique aqui</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>

        <div className={styles.shape} />
      </div>
  
      
    </div>
  </main>
  );
}
