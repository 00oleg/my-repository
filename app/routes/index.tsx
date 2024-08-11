import { redirect } from '@remix-run/react';

export const loader = () => {
  return redirect('/search');
};

export default function Index() {
  return null;
}
