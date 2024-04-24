import React, { useState } from 'react';
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";

const Home = () => {
  // Не будет отображаться
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Перенаправление на страницу /news, так как она сейчас по сути дефолтная.
  return {
    redirect: {
      destination: '/news',
      permanent: false,
    },
  };
};

export default Home;
