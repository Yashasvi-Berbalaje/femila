"use client";
import SuccessPage from "@/components/SuccessPage";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import axiosInstance from "@/components/axiosInstance";

const ComponetPage = () => {
  const searchParams = useSearchParams();
  const [quote,setQuote] = useState(null);

  const proposalNo = searchParams.get("proposalNo");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      const data = {sessionId,proposalNo};
      axiosInstance
          .post("/checkpayment",data)
          .then((response) => {
            setQuote(response.data.issueQuote);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, []);

  // useEffect(() => {
  //   // if (issueQuote && transaction) {
  //     console.log('Name:', issueQuote);
  //     console.log('Age:', transaction);
  //   // }else{
  //   //   router.push("/")
  //   // }
  // }, [issueQuote, transaction]);

  return (
    <SuccessPage
        quote={quote}
        proposalNo={proposalNo}
    />
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponetPage />
    </Suspense>
  );
};

export default Page;
