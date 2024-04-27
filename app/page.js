'use client';

import styles from '../styles/Home.module.css';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DashboardPage from './dashboard/page';

export default function Page() {
  return (
    <>
      <DefaultLayout>
        <DashboardPage />
      </DefaultLayout>
    </>
  );
}
