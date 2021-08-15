import { NextRouter, useRouter as useNextRouter } from 'next/router';

type Hooks = {
  router: NextRouter;
};
export const useRouter = (): Hooks => {
  const router = useNextRouter();

  return { router };
};
