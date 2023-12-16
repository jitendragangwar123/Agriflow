import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { ToastProvider } from "react-toast-notifications";
import RegisterNewConsumer from "../components/consumer/RegisterNewConsumer";
import Footer from "../components/Footer";
import Header from "../components/Header";

const RegistrationPage: NextPage = () => {
 return (
   <>
     <Head>
       <title>Consumer Registration</title>
       <meta name="description" content="Producer Registration" />
       <link rel="icon" href="/favicon.ico" />
     </Head>
     <Header />
     <ToastProvider>
       <RegisterNewConsumer />
     </ToastProvider>
     <Footer />
   </>
 );
};

export default RegistrationPage;