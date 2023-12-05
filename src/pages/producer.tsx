import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { ToastProvider } from "react-toast-notifications";
import RegisterNewProducer from "../components/producer/RegisterNewProducer";

const RegistrationPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Producer Registration</title>
        <meta name="description" content="Producer Registration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastProvider>
        <RegisterNewProducer />
      </ToastProvider>
    </>
  );
};

export default RegistrationPage;
