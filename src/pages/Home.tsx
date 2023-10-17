import React, { useEffect, useState } from "react";
import {
  Title,
} from "@mantine/core";
import NewRecordForm from "../components/NewRecordForm/NewRecordForm";

const Home: React.FC = () => {

  return (
    <>
      <Title order={1}>New record</Title>
      <NewRecordForm />
    </>
  );
};

export default Home;
