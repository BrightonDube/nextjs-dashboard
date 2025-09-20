import { ArrowRightIcon } from '@heroicons/react/24/outline';
import LoginForm from '@/app/ui/login-form';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <div className="text-white">Acme</div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="text-xl font-semibold text-gray-800">Log in</div>
          <p className="text-sm text-gray-700">Use demo credentials from the tutorial seed.</p>
          <a
            href="https://nextjs.org/learn/dashboard-app/adding-authentication"
            className="text-blue-600"
          >
            Learn more <ArrowRightIcon className="inline h-4 w-4" />
          </a>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}


